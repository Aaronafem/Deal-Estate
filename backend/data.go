package main

import (
	"sync"
)

type Property struct {
	ID     int     `json:"id"`
	City   string  `json:"city"`
	SF     int     `json:"sf"`
	Floors int     `json:"floors"`
	Price  float64 `json:"price"`
}

var (
	properties = []Property{
		{ID: 1, City: "San Francisco", SF: 2000, Floors: 2, Price: 1200000},
		{ID: 2, City: "New York", SF: 1500, Floors: 1, Price: 950000},
		{ID: 3, City: "Chicago", SF: 1800, Floors: 2, Price: 800000},
		{ID: 4, City: "Austin", SF: 2200, Floors: 3, Price: 700000},
	}
	propertyLock = sync.Mutex{}
)
