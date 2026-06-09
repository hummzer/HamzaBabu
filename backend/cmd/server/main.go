package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Nexus Backend starting on :8080")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to Nexus API")
	})
	http.ListenAndServe(":8080", nil)
}
