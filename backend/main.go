package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/properties", getProperties)
	http.HandleFunc("/properties/create", createProperty)
	http.HandleFunc("/properties/bid", bidOnProperty)

	fmt.Println("Starting server at port 8080...")
	http.ListenAndServe(":8080", nil)
}
