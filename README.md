# NestJS Tech Blog API

NestJS 기반의 DDD(Domain-Driven Design, 도메인 주도 설계) 기술 블로그의 API를 제작해 보았습니다.
<br/>
이 프로젝트는 모듈화, 확장성 및 유지보수가 용이한 코드를 보장하기 위해 도메인 주도 설계 원칙을 준수합니다.

-   [NestJS](https://nestjs.com/)
-   [DDD(Domain-Driven Design)](https://en.wikipedia.org/wiki/Domain-driven_design)

---

## Features

본 프로젝트의 상세한 특징 및 사용 기술/패키지는 아래와 같습니다.

-   **Swagger**: 명확한 API 문서를 제공합니다.
-   **JWT Authentication**: stateless 인증을 보장하며 Token Rotation 방식을 사용합니다.
-   **Redis**: 포스트 글의 캐싱과 토큰 인증을 통해 성능과 확장성을 향상시킵니다.
-   **PM2**: 무중단 배포와 로드밸런싱을 관리합니다.
-   **Jenkins**: CI/CD를 자동화하여 배포 흐름을 개선합니다.
-   **Docker**: 개인 NAS 서버에서 호스팅되어 신뢰성 있는 일관된 개발 환경을 보장합니다.

---

## Preview

[**Explore the API here!**](http://dstb.server.osj-nas.synology.me/api-docs)
