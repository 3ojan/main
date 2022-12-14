
const getData = (token, verificationCode) => {
  return {
    "token": token,
    "signatureFormat": "pades",
    "signatureType": "sign",
    "addVisualData": true,
    "personNaturalData": {
      "nameSurname": "Domagoj Pavić",
      "pin": "26688614868",
      "pinCountry": "HR"
    },
    "documents": [
      {
        "base64Document": "JVBERi0xLjUKJeLjz9MKOCAwIG9iago8PC9UeXBlL01ldGFkYXRhL1N1YnR5cGUvWE1ML0xlbmd0aCA5MDQ+PgpzdHJlYW0KPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+YXBwbGljYXRpb24vcGRmPC9kYzpmb3JtYXQ+PC9yZGY6RGVzY3JpcHRpb24+PHJkZjpEZXNjcmlwdGlvbiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgcmRmOmFib3V0PSIiPjx4bXBNTTpEb2N1bWVudElEPnV1aWQ6MDlFNTA4QzktRERDQy00NDZFLTgwODEtN0Y4QzAwNjg1RkU4PC94bXBNTTpEb2N1bWVudElEPjwvcmRmOkRlc2NyaXB0aW9uPjxyZGY6RGVzY3JpcHRpb24geG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiByZGY6YWJvdXQ9IiI+PHhtcDpDcmVhdG9yVG9vbD5BQkJZWSBGaW5lUmVhZGVyIFBERiAxNTwveG1wOkNyZWF0b3JUb29sPjx4bXA6Q3JlYXRlRGF0ZT4yMDIyLTExLTI3VDIwOjAxOjU3KzAxOjAwPC94bXA6Q3JlYXRlRGF0ZT48eG1wOk1vZGlmeURhdGU+MjAyMi0xMS0yN1QyMDowMzowOCswMTowMDwveG1wOk1vZGlmeURhdGU+PC9yZGY6RGVzY3JpcHRpb24+PHJkZjpEZXNjcmlwdGlvbiB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iIHJkZjphYm91dD0iIj48cGRmOlByb2R1Y2VyPkFCQllZIEZpbmVSZWFkZXIgUERGIDE1PC9wZGY6UHJvZHVjZXI+PC9yZGY6RGVzY3JpcHRpb24+PC9yZGY6UkRGPjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSd3Jz8+CgplbmRzdHJlYW0KZW5kb2JqCjIwIDAgb2JqCjw8L0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMjU3Pj4Kc3RyZWFtCnicXZBLbsQgDIZPkDt4OV2MSNJ5dBFFmk5bKYs+1HQOQMDJIE0AEbLI7YshmkpdYH3G/Ni/2bl5abTywL6cES166JWWDiczO4HQ4aA0FCVIJfyaxShGboEFcbtMHsdG9waqCth3KE7eLZuTNB0+APt0Ep3Sw+ZybkPaztbecETtIYe6Bol9+Oad2w8+IrCo2jYy1JVftkHz9+JnsQgl5VmxDmEkTpYLdFwPmFV5Xlf5sc5Qy3+lpyToenHlLj6EEHZlHbiIfHgjLhM/Ez9GLnPiXbo/Ee8TF8SHxK/Ex8T72H/tRJPQpu4OxexcMBfXGV2RH6XxvnFrLAQVnV+YZn7KCmVuZHN0cmVhbQplbmRvYmoKNjMgMCBvYmoKPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCA5OT4+CnN0cmVhbQp4nCtUcArRdzNQMDRSCElTsDDRszQzVDA3MdczMAKKpGgwaIZkKVjoGRiYKBiA+IwgvpmemTmUzwTmQ9jMILaxnrExVI6QXhYQ30jPzAyqnxVNng2Nzw7iu4YoBCoAAM7WJqAKZW5kc3RyZWFtCmVuZG9iago2NSAwIG9iago8PC9UeXBlL09ialN0bS9OIDEwL0ZpcnN0IDYzL0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggNTYxPj4Kc3RyZWFtCnicfVNdb9owFH33r7hv7TSBP5I4yVRVImGo1cqGgK2qEA9e4oI3iJHjSN2/301SaFmnPljx9T0591zfYwGMBCBjEgJnKYlByIjwEEIeEx5DGKSEJyC5JJJBnMZEckiikEgBaSTI1RWhyz8HDTRXXu3shtCp9qrEABJgMCf0W+N3ptI1IGt3MFMbjIIuuL5+RdElCM1tU3nghH4xZQ2r7q/1W2QLrLyuPGJk0INo7uwhs0+wYjBgQ8EhSqOhiCUkIR/KZN3KK416HzJTDmmfFdK5rm3jCpSMN9CdLLxrCt+jahjwo7bcaeWtg8tRlj08wAS7nmtVagez8QR49AGpnS2bQr+L6WiMrcbKa7gcfxJMCM5FLBjjUfyR8QvGLhA3teV/IAFLTpCzOzvO4fx0gnc41nXhzAGlEzqqi7b3WCQoRB1utNlsPXqEtqA2MxAco8lObXCGgnQEWXefAylDGAQiBJTB0E5Buu7zX9UeS42cUbvpsj+674lDhmS36BxTjKrNTreVFl7vb46bH7h5IxhTzU/fhUvX6DZBaKZq3SZfFfpcFbY01Qb9209uYlzt861yLf1564Bu7zB36hkSY0n7vTLIobGlPntvSr9tHSclRBEu7FTE+GyE6ON+nfzaKcLH0jvf2WKhPaxoO2y61E+o9naPZs6fv9k/Rj920Ld36gdlVKOqNi/psXl81GjI1qfobJoBtUB/A60PqkCiX0AV0AqofpGGM0qOr/AvHnEX1QplbmRzdHJlYW0KZW5kb2JqCjY5IDAgb2JqCjw8L1R5cGUvWFJlZi9TaXplIDcwL1dbMSAyIDFdL1Jvb3QgMiAwIFIvSW5mbyA3IDAgUi9JRFsoS75wmZXDZAcJndoBmGWAeykoS75wmZXDZAcJndoBmGWAeyldL0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggNjkKPj4Kc3RyZWFtCnicY2CAACYGRxBmBGImBoQYMyMDPwM2AJRjQWKzAjEbiM3I/Air+sECgO5kB2IOIOZkZNUAizGynkdRw8gRzwAAwJAFLQplbmRzdHJlYW0KZW5kb2JqCnN0YXJ0eHJlZgoyMTQzCiUlRU9G",
        "verificationCode": verificationCode,
        "firstRowMessage": "Općina Semeljci",
        "secondRowMessage": "Potpis",
        "thirdRowMessage": "Plavi link"
      }
    ]
  }
}

module.exports = {
  getData
}