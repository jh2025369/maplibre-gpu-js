# MapLibre-GPU-js

## 项目简介
MapLibre-GPU-js 是一个创新的开源地图库，通过整合 [MapLibre-gl-js](https://github.com/maplibre/maplibre-gl-js) 的地图功能和 [Babylon.js](https://www.babylonjs.com/) 的 WebGPU 渲染能力，研究下一代高性能地图渲染解决方案。

## 功能特性
- **未来技术架构**：采用 WebGPU 作为底层渲染接口，更高效的渲染管线。
- **无缝兼容性**：完全兼容 MapLibre-gl-js 现有 API 接口。
- **无限扩展可能**：基于 Babylon.js 渲染引擎构建，理论上可轻松集成 Babylon 生态的 3D 模型、特效和后期处理，支持自定义着色器和高级渲染效果。

## 在线示例
- [底图加载示例](
https://jh2025369.github.io/maplibre-gpu-js/test/examples/base-map.html)
- [3D 建筑展示](
https://jh2025369.github.io/maplibre-gpu-js/test/examples/add-3d-model-babylon.html)

## 快速开始
**安装依赖**
```
npm install
```
**构建开发版本**
```
npm run build-dev
```
**启动服务**
```
npm run start-server
```
**访问示例页面**
```
http://localhost:9967/test/examples/add-3d-model-babylon.html
```
![3D Model Example](test/examples/images/add-3d-model-babylon.png)

## 许可
本项目基于 [MapLibre-gl-js](https://github.com/maplibre/maplibre-gl-js) 和 [Babylon.js](https://www.babylonjs.com/)，遵循 [MapLibre 许可](LICENSE.txt) 和 [Apache-2.0 许可](license.md)。
