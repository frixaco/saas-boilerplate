package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

// SampleData structure for sample route
type SampleData struct {
	Message string `json:"message"`
}

var db *sql.DB

func healthcheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var sampleData SampleData

	// err := db.QueryRow("SELECT id, name FROM user WHERE id = $1", "1").Scan(&sampleData.ID, &sampleData.Name)
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }
	sampleData = SampleData{
		Message: "Hello World",
	}

	json.NewEncoder(w).Encode(sampleData)
}

func main() {
	var err error

	godotenv.Load()

	DATABASE_URL := os.Getenv("DATABASE_URL")
	PORT, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		PORT = 4000
	}

	db, err = sql.Open("postgres", DATABASE_URL)
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal("Database connection error: ", err)
	}

	router := mux.NewRouter()

	router.HandleFunc("/healthcheck", healthcheck).Methods("GET")

	log.Printf("Server starting on port %d...", PORT)
	err = http.ListenAndServe(fmt.Sprintf(":%d", PORT), router)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
