package main

import (
    "encoding/json"
    "log"
    "net/http"
    "os"
)

// Property struct represents a property listing
type Property struct {
    ID        int    `json:"id"`
    Name      string `json:"name"`
    Address   string `json:"address"`
    Price     string `json:"price"`
    Sqft      int    `json:"sqft"`
    Bedrooms  int    `json:"bedrooms"`
    Bathrooms int    `json:"bathrooms"`
}

func main() {
    // Apply CORS middleware to the listings route
    http.Handle("/api/listings", enableCors(http.HandlerFunc(listingsHandler)))

    log.Println("Starting server on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}



func listingsHandler(w http.ResponseWriter, r *http.Request) {
    market := r.URL.Query().Get("market")
    if market == "" {
        http.Error(w, "Market query parameter is required", http.StatusBadRequest)
        return
    }

    filePath := "./data/" + market + ".json"
    log.Println("Loading file:", filePath)  // Log the file path

    file, err := os.Open(filePath)
    if err != nil {
        log.Println("Error opening file:", err)  // Log the error
        http.Error(w, "Error loading listings", http.StatusInternalServerError)
        return
    }
    defer file.Close()

    var listings []Property
    if err := json.NewDecoder(file).Decode(&listings); err != nil {
        log.Println("Error decoding JSON:", err)  // Log the error
        http.Error(w, "Error decoding listings", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(listings)
}





func enableCors(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Set CORS headers
        w.Header().Set("Access-Control-Allow-Origin", "*")  // Allow all origins
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")  // Allowed HTTP methods
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")  // Allowed headers

        // Handle preflight requests
        if r.Method == "OPTIONS" {
            return
        }

        next.ServeHTTP(w, r)
    })
}


