const mockItems = [
        { id: 1, name: "ไข่ไก่สดปลอดสาร ตราซีพี ซีเล็คชั่น เบอร์ 1 แพ็ค 4 ฟอง", price: 35, image: "https://storage.googleapis.com/cmpd-sit-bucket-app/images/cpknow/1619514145_%E0%B8%A3%E0%B8%AD%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%AD%E0%B8%B5%E0%B8%A2%E0%B8%94%E0%B8%81%E0%B9%88%E0%B8%AD%E0%B8%99-3d_cp_selection_egg_fresh_no.4_pack4.png", category: "โปรตีน" },
        { id: 2, name: "เบทาโกร เนื้อหมูสามชั้นสไลซ์ 500 ก.", price: 155, image: "https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/98/88/8856294086198/thumbnail/8856294086198_1-20231025141534-.jpg", category: "โปรตีน" },
        { id: 3, name: "เบทาโกร หมูบด 500 ก.", price: 78, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8852043%2FBETAGRO-BetagroMincedPork500g-8852043045010-1.jpg&w=1200&q=75", category: "โปรตีน" },
        { id: 4, name: "เอสเพียวน่องติดสะโพกไก่ 500 ก.", price: 118, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F0000035%2FSPURE-SPureChickenLeg500gC-0000035709022-1.jpg%3Fwidth%3D255&w=640&q=75", category: "โปรตีน" },
        { id: 5, name: "ท็อปส์กุ้งขาวผ่าหลังไว้หางแช่แข็ง 500 ก.", price: 70, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8853474%2FTOPS-TopsFrozenDeveinedShrimp500g-8853474065189-1.jpg%3Fwidth%3D255&w=640&q=75", category: "โปรตีน" },
        { id: 6, name: "มารีนพลัสเนื้อปลาแซลมอนหั่นชิ้นแช่แข็ง 100 ก.", price: 99, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8853474%2FMARINEPLUS-MarinePlusFrozenSalmonPortionCut120g-8853474094035-1.jpg%3Fwidth%3D255&w=640&q=75", category: "โปรตีน" },
        { id: 7, name: "นางพยาบาลเต้าหู้หลอดไข่ไก่ 120 ก.", price: 12, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8850721%2FNURSE-NurseEggTofu120g-8850721013115-1.jpg%3Fwidth%3D255&w=640&q=75", category: "โปรตีน" },
        { id: 8, name: "ดีน่า นมถั่วเหลืองจมูกข้าวญี่ปุ่นผสมงาดำ 230 มล. แพ็ค 3", price: 38, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8853002%2FDNA-DNAUHTSoyMilkBioGaba230mlPack3-8853002301895-1.jpg%3Fwidth%3D255&w=384&q=75", category: "โปรตีน" },
        { id: 9, name: "มารีนพลัสเนื้อปลาแพนกาเซียสดอร์รี่แล่ ไม่ติดเนื้อท้อง แช่แข็ง 170 ก.", price: 75, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8853474%2FMARINEPLUS-MarinePlusFrozenPangasiusDoryFilletPremiumGrade170g-8853474094059-1.jpg&w=1200&q=75", category: "โปรตีน" },
        { id: 10, name: "เห็ดหลินคอมโบ 250กรัม", price: 49, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F0000034%2FNONE-MixShimejiMushroom250g-0000034416020-1.jpg%3Fwidth%3D255&w=640&q=75", category: "ผัก" },
        { id: 11, name: "ดร.คะน้า 250กรัม", price: 49, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F0000033%2FDOCTORVEGETABLES-DrKale250gC-0000033454023-1.jpg%3Fwidth%3D255&w=640&q=75", category: "ผัก" },
        { id: 12, name: "ดร.ผักกาดขาวปลีออร์แกนิค 400กรัม", price: 68, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F0000046%2FDOCTORVEGETABLES-DrOrganicWhiteCabbage400gC-0000046597069-1.jpg%3Fwidth%3D255&w=640&q=75", category: "ผัก" },
        { id: 13, name: "แอสกรีนมะเขือเทศเชอร์รี่แดง 300กรัม", price: 89, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F4897067%2FAQUAGREEN-AquaGreenRedCherryTomato300gC-4897067021392-1.jpg%3Fwidth%3D255&w=640&q=75", category: "ผัก" },
        { id: 14, name: "เอ็น&พีแตงกวา 250กรัม", price: 28, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8858738%2FNP-NPCucumber250g-8858738401673-1.jpg%3Fwidth%3D255&w=640&q=75", category: "ผัก" },
        { id: 15, name: "มายช้อยส์หอมใหญ่ 500กรัม", price: 55, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8853474%2FMYCHOICE-MyChoiceOnion500g-8853474019359-1.jpg%3Fwidth%3D255&w=640&q=75", category: "ผัก" },
        { id: 16, name: "กระเทียมไทยแกะกลีบปลอดภัยสารพิษ 200กรัม", price: 100, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8859189%2FNONE-PeeledPesticideThaiGarlic200g-8859189900432-1.jpg%3Fwidth%3D255&w=640&q=75", category: "ผัก" },
        { id: 17, name: "มายช้อยส์พริกชี้ฟ้าแดง 50กรัม", price: 20, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F0000020%2FMYCHOICE-MyChoiceRedChilliSpur50g-0000020911836-1.jpg%3Fwidth%3D255&w=640&q=75", category: "เครื่องปรุง" },
        { id: 18, name: "ทิพรส น้ำปลาแท้ 700 มล.", price: 32, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8850545%2FTIPAROS-TiparosFishSauce700cc-8850545777552-1.jpg%3Fwidth%3D255&w=640&q=75", category: "เครื่องปรุง" },
        { id: 19, name: "เด็กสมบูรณ์ซีอิ้วขาวสูตร1 700ซีซี", price: 55, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8850206%2FHEALTHYBOY-HealthyBoyWhiteSoySauceFormula1700cc-8850206011025-1.jpg%3Fwidth%3D255&w=640&q=75", category: "เครื่องปรุง" },
        { id: 20, name: "มรกต น้ำมันถั่วเหลือง 1 ลิตร", price: 60, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8850154%2FMORAKOT-MorakotSoyBeanOil1ltr-8850154051043-1.jpg%3Fwidth%3D255&w=640&q=75", category: "เครื่องปรุง" },
        { id: 21, name: "มิตรผล น้ำตาลทรายขาวบริสุทธิ์ 1 กก.", price: 27, image: "https://www.tops.co.th/_next/image?url=https%3A%2F%2Fassets.tops.co.th%2Ffile-assets%2FTOPSPIM%2Fweb%2FImage%2F8850256%2FMITRPHOL-MitrpholRefinedWhiteSugar1kg-8850256100106-1.jpg%3Fwidth%3D255&w=640&q=75", category: "เครื่องปรุง" },
        { id: 22, name: "เกลือปรุงทิพย์ 500 กรัม", price: 11, image: "https://www.sangdamrong.com/wp-content/uploads/2024/05/image-459-768x549.webp", category: "เครื่องปรุง" },
        { id: 23, name: "ข้าวหอมมะลิ 120 กรัม", price: 12, image: "https://www.calforlife.com/image/food/Rice-7-11.jpg", category: "คาร์โบไฮเดรต" },
        { id: 24, name: "ข้าวกล้องหอมมะลิ 120 กรัม", price: 12, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSukzG2ukqbZMK3sX_4drc8rlZLPcK_ldYVcg&s", category: "คาร์โบไฮเดรต" },
        { id: 25, name: "เส้นหมี่ไวไวอบแห้ง 180 ก.", price: 18, image: "https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/89/88/8850100002389/8850100002389_2-20221222165118-.jpg", category: "คาร์โบไฮเดรต" },
        { id: 26, name: "มาม่า บะหมี่กึ่งสำเร็จรูป รสหมูสับ 60 ก.", price: 8, image: "https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/99/88/8850987101199/thumbnail/8850987101199_2-20240703142205-.jpg", category: "คาร์โบไฮเดรต" }
      ];

      function mockGeminiResult(){
  return `{
  "ingredients": [
    {
      "id": 2,
      "quantity": 1
    },
    {
      "id": 16,
      "quantity": 1
    },
    {
      "id": 17,
      "quantity": 1
    },
    {
      "id": 22,
      "quantity": 1
    },
    {
      "id": 23,
      "quantity": 1
    },
    {
      "id": 20,
      "quantity": 1
    }
  ],
  "comment": "ไม่มีน้ำมันหอยและซอสหอยนางรม"
}`;
}
