package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

type Property struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Address   string `json:"address"`
	Price     string `json:"price"`
	Sqft      int    `json:"sqft"`
	Bedrooms  int    `json:"bedrooms"`
	Bathrooms int    `json:"bathrooms"`
}

func listingsHandler(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight requests
	if r.Method == http.MethodOptions {
		return
	}

	market := r.URL.Query().Get("market")
	filename := "/absolute/path/to/public/" + market + ".json"
	// Updated path to access JSON files in the public directory

	data, err := loadJSONData(filename)
	if err != nil {
		http.Error(w, "Could not load listings", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func loadJSONData(filename string) ([]Property, error) {
	var properties []Property
	fileData, err := os.ReadFile(filename)
	if err != nil {
		return properties, err
	}
	err = json.Unmarshal(fileData, &properties)
	return properties, err
}

func main() {
	http.HandleFunc("/listings", listingsHandler)
	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
