# Carrot Market

## Image of Nextjs

- lazy 속성 : 뷰포트에 이미지가 보이면 로드. 그 전엔 placeholder 설정대로,

### Local Image

- Local Image는 프로젝트 내에 존재하는 파일
- NextJs는 로컬 이미지의 존재를 미리 알기에 최적화해줌
- remote의 경우 로컬만큼 최적화 안됨.
- 따라서 Nextjs는 lazy의 placeholder:blur를 remote img에는 적용하지 못함(무엇인지 알지 못하기에)
- 하지만 Image를 사용한다면 가능함.
