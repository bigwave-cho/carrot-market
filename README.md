# Carrot Market

## Cloud Flare img upload

- Option1: File (browser) =업로드=> Our Server =업로드=> CF.
  서버가 중간에 껴있어서 데이터 전송에 BandWidth에 대한 돈을 지불해야 함.

- Option2: File(browser) with my API TOKEN(CF) ==> CF.
  프론트에서 API 토큰을 포함한 api 요청을 보내는 것이라 유저가 뭔 짓을 할지 몰라서 위험.

- Option3: DCU(Direct Creator Upload) -백엔드에서 API TOKEN를 사용하기에 노출 위험 X
  유저) 파일 있어 ---> 백엔드) 유저가 파일 있데 ---> CF) 빈파일 URL 줄게요

  https://developers.cloudflare.com/images/cloudflare-images/upload-images/direct-creator-upload/

CF) URL 빈파일 ---> 백엔드) URL 받음 ---> 빈파일을 유저에게.

유저) CF에 직접 파일 업로드. (만약 업로드를 하지 않고 나가버려도 CF에서 30분 후에 알아서 공간 삭제)

- 결론: DCU를 사용하면 백엔드에서는 이미지 전송을 하지 않으니 BandWidth에 대한 요금을 지불할 필요 X
  유저의 브라우저에서 1회용 토큰을 받아 CF에 직접 이미지를 업로드하게 되는 것이라 시간 측면에서도 이득.

## Cloud Flare 사용 준비

- 5달러 결제.
- get API -> create custom token
- 토큰이름 : Images Token(암거나) / Permission: Account, Cloudflare Images Edit
- 발급된 API TOKEN과 Images탭의 AccountID .env에 넣기
