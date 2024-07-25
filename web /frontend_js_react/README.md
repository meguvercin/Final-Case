Bu proje, [Next.js](https://nextjs.org/) ile oluşturulmuş bir web uygulamasıdır.

### Kurulum

npm install # veya yarn install ile dependency'leri yükleyin.

````

### Geliştirme Sunucusunu Başlatma

Geliştirme sunucusunu başlatmak için aşağıdaki komutu çalıştırın:

```bash
npm run dev # veya yarn dev
````

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin. Değişiklik yaptığınızda sayfa otomatik olarak yeniden yüklenecektir.

### Production Build

Prod build için:

```bash
npm run build # veya yarn build
```

Ardından, prod ortamında çalıştırmak için:

```bash
npm start # veya yarn start
```

\*\*Projeyi Backend_flask ile birlikte çalıştırın.

## Proje Yapısı

```plaintext
/
├── components/      # React bileşenleri
├── app/          	 # Next.js sayfaları
├── public/          # Statik dosyalar
├── Data/           # Yardımcı,Dummy veriler
├──Redux/   	# redux store dosyaları
└── Util/    	 # yardımcı fonksiyonlar
```
