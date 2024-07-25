const getPrompt = (oceanComment, oceanCampaigns, questions, answers) => {
  let prompt = `Bir Banka müdürüyüm ve müşteriye özel kişiselleştirilmiş kampanya yapmak istiyorum. Ocean testi yaptım ve bu test sayesinde yaptığım bazı çıkarımlarım var. Ayrıca bu kullanıcıya özel anket verilerini de sana vereceğim. senden vermeni istediğim çıktı aşağıdaki şekilde olacak , bir python dictionary’si içinde ve yalnızca bu dictionary'yi yanıt olarak göndereceksin. çıktı olarak sadece bu dict'i almak istiyorum. python dict'inin yapısı şöyle olacak : campaigns içinde kampanya 1'den 5 e kadar kampanyaların olduğu bir array şeklinde.  Vermeni istediğim kampanyalar ise olabildiğince spesifik olacak. müşterinin ilgisini çekecek alanlarda, gerçek bir banka kampanyası gibi olacak. Örneğin ‘müşteri kitap okumayı seviyor’ bilgisine sahipsek, ‘Anlaşmalı kitap mağazalarında %15 indirim!’ şeklinde bir kampanya istiyorum. comment içinde ise bir string halinde bu müşterinin anket sonuçlarına ve kişilik analizine bakarak nelerden hoşlandığına, nelerden yola çıkarak bu kampanyaları önerdiğine değin.  bu formatta 5 adet kampanyayı ve yorumu dictionary içinde ver. müşteriye yaptığım ocean anketinin sonucunda yaptığım çıkarımlar şöyle: ${oceanComment} .  düşündüğüm genel kampanyalar:  ${Object.values(
    oceanCampaigns
  )} anket soruları ve verdiği cevaplar ise böyle: ${
    questions[0]
  } (1'den 5'e kadar) – ${answers[0]} , ${questions[1]} (1'den 5'e kadar) – ${
    answers[1]
  } , ${questions[2]}  (1'den 5'e kadar) - ${answers[2]} , ${
    questions[2]
  } (1'den 5'e kadar) – ${answers[2]} , ${questions[3]} (1'den 5'e kadar) - ${
    answers[3]
  } , ${questions[4]} (1'den 5'e kadar) - ${answers[4]} , ${
    questions[5]
  } (1'den 5'e kadar) - ${answers[5]} , ${questions[6]} (1'den 5'e kadar) - ${
    answers[6]
  } , ${questions[7]} (1'den 5'e kadar) - ${answers[7]} , ${
    questions[8]
  } (1'den 5'e kadar) - ${answers[8]} , ${questions[9]} (1'den 5'e kadar) - ${
    answers[9]
  }`;
  return prompt;
};
export default getPrompt;
