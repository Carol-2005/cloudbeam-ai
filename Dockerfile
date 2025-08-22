FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# EXPOSE 3000

# CMD ["npm", "run","dev"]

#---stage 2----
    FROM node:22-alpine
    WORKDIR /app
    #copying from build stage is much more faster
    # Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

    EXPOSE 3000
    CMD ["npm", "run", "start"]
