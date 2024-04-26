package main

import (
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	"github.com/labstack/echo"
)

type DefaultResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

func checkhealth(c echo.Context) error {
	type Message struct {
		Message string `json:"message"`
	}
	message := &Message{
		Message: "Hello World",
	}
	c.JSONPretty(http.StatusOK, message, "  ")
	return c.String(http.StatusOK, "Hello, World!")
}

func main() {
	godotenv.Load()

	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		port = 4000
	}

	e := echo.New()
	e.GET("/checkhealth", checkhealth)

	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", port)))
}
