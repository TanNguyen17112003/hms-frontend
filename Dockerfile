# Base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json và yarn.lock
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy toàn bộ source code
COPY . .

# Build Next.js app
RUN yarn build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built output từ builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Install production dependencies
RUN yarn install --production

# Expose cổng 3000
EXPOSE 3000

# Start app
CMD ["yarn", "start"]