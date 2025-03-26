# Sử dụng Node.js LTS
FROM node:18-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và yarn.lock
COPY package.json yarn.lock ./

# Cài đặt dependencies
RUN yarn install --frozen-lockfile

# Copy toàn bộ code vào container
COPY . .

# Build project
RUN yarn build

# Chạy server Next.js
CMD ["yarn", "start"]

# Expose cổng 3000
EXPOSE 3000