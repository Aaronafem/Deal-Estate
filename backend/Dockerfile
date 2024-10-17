# Use the official Golang image to build the Go application
FROM golang:1.18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Go modules manifests
COPY go.mod go.sum ./

# Download Go modules
RUN go mod download

# Copy the source code
COPY . .

# Build the Go application
RUN go build -o main .

# Use a minimal base image to run the compiled Go binary
FROM alpine:latest

# Set the working directory inside the container
WORKDIR /root/

# Copy the compiled Go binary from the build stage
COPY --from=build /app/main .

# Expose port 8080
EXPOSE 8080

# Command to run the executable
CMD ["./main"]

