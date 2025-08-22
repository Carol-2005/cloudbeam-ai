FROM node:22-alpine AS builder

WORKDIR /app
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
ENV CLERK_PUBLISHABLE_KEY=$CLERK_PUBLISHABLE_KEY
ENV DATABASE_URL=$DATABASE_URL
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
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
COPY --from=builder /app/prisma ./prisma  
    EXPOSE 3000
    ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
ENV CLERK_PUBLISHABLE_KEY=$CLERK_PUBLISHABLE_KEY
ENV DATABASE_URL=$DATABASE_URL
    CMD ["npm", "run", "start"]

    #to build image
    # docker build -t cloudinary-multistage .
#to run docker file
    # docker run -p 3000:3000 -e CLERK_SECRET_KEY=sk_test_n8KkOMt561Lp74bLSS4tqZuF0dD0operSjSfHKxRG2 -e DATABASE_URL="postgresql://neondb_owner:npg_5trzYC8AaLNo@ep-lingering-dust-a5xwannj-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require" cloudinary-multistage