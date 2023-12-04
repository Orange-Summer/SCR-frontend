# SCR-frontend
云计算类案检索前端

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### 构建镜像

```sh
docker build -t frontend:v1 .
```

启动容器时要将容器的 80 端口映射到宿主机指定端口。