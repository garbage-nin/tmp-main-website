#!/usr/bin/env bash
set -euo pipefail

ENV="${1:-prod}"
COMPOSE_FILE="docker-compose.${ENV}.yml"
PROJECT_DIR="/opt/regis-datasec"

cd "$PROJECT_DIR"

echo "=== Deploying ${ENV} environment ==="

echo "Pulling latest code..."
git pull origin main

echo "Building Docker image..."
docker compose -f "$COMPOSE_FILE" build --no-cache

echo "Starting containers..."
docker compose -f "$COMPOSE_FILE" up -d --force-recreate

echo "Pruning old images..."
docker image prune -f

echo "=== Deployment complete (${ENV}) ==="
