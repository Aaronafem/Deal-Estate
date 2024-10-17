package main

import (
	"encoding/json"
	"net/http"
)

func setupCORS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func getProperties(w http.ResponseWriter, r *http.Request) {
	setupCORS(w, r)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(properties)
}

func createProperty(w http.ResponseWriter, r *http.Request) {
	setupCORS(w, r)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var newProperty Property
	if err := json.NewDecoder(r.Body).Decode(&newProperty); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	propertyLock.Lock()
	defer propertyLock.Unlock()
	newProperty.ID = len(properties) + 1
	properties = append(properties, newProperty)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newProperty)
}

func bidOnProperty(w http.ResponseWriter, r *http.Request) {
	setupCORS(w, r)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var bid struct {
		PropertyID int     `json:"property_id"`
		BidAmount  float64 `json:"bid_amount"`
	}

	if err := json.NewDecoder(r.Body).Decode(&bid); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	propertyLock.Lock()
	defer propertyLock.Unlock()

	for i, property := range properties {
		if property.ID == bid.PropertyID {
			if bid.BidAmount > property.Price {
				properties[i].Price = bid.BidAmount
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(properties[i])
				return
			} else {
				http.Error(w, "Bid amount must be higher than the current price", http.StatusBadRequest)
				return
			}
		}
	}

	http.Error(w, "Property not found", http.StatusNotFound)
}
