# FROM node:22-alpine AS builder

# WORKDIR /app
# ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
# ENV CLERK_PUBLISHABLE_KEY=$CLERK_PUBLISHABLE_KEY
# ENV DATABASE_URL=$DATABASE_URL
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npx prisma generate
# RUN npm run build
# # EXPOSE 3000

# # CMD ["npm", "run","dev"]

# #---stage 2----
#     FROM node:22-alpine
#     WORKDIR /app
#     #copying from build stage is much more faster
#     # Copy only necessary files from builder
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/prisma ./prisma  
#     EXPOSE 3000
  
#     CMD ["npm", "run", "start"]

#     #to build image
#     # docker build -t cloudinary-multistage .
# #to run docker file
#     # docker run -p 3000:3000 -e CLERK_SECRET_KEY=sk_test_n8KkOMt561Lp74bLSS4tqZuF0dD0operSjSfHKxRG2 -e DATABASE_URL="postgresql://neondb_owner:npg_5trzYC8AaLNo@ep-lingering-dust-a5xwannj-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require" cloudinary-multistage


# ------------------------
# Stage 1: Builder
# ------------------------
    FROM node:22-alpine AS builder

    # Set working directory
    WORKDIR /app
    
    # Copy package files and install dependencies
    COPY package*.json ./
    RUN npm install
    
    # Copy the rest of the project
    COPY . .
    
    # Generate Prisma client for Linux
    RUN npx prisma generate --schema=./prisma/schema.prisma
    
    # Build Next.js app
    # Skip runtime envs needed only at runtime
    ENV NEXT_PUBLIC_SKIP_CLERK_BUILD=1
    RUN npm run build
    
    # ------------------------
    # Stage 2: Production
    # ------------------------
    FROM node:22-alpine AS production
    
    WORKDIR /app
    
    # Copy only necessary files from builder (no dev deps)
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/prisma ./prisma
    
    # Expose port
    EXPOSE 3000
    
    # Runtime environment variables (pass these when running container)
    # Do NOT hardcode secrets here
    ENV NODE_ENV=production
    
    # Start Next.js
    CMD ["npm", "run", "start", "-H", "0.0.0.0", "-p", "3000"]
    