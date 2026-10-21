import React, { useState, useEffect, useRef } from 'react';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyEtcZI-_AtWXo_SLuzR7mgYN61xvHbQJ1OSVI3LyccXO-kI-zWXkgvWwbpoIcG3R54RQ/exec";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.log("Lỗi nhạc:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // --- THỜI GIAN ĐẾM NGƯỢC (29/12/2026) ---
  const weddingDate = new Date('2026-12-29T16:30:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- GOOGLE CALENDAR LINK ---
  const googleCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Đám+Cưới+Đức+Mạnh+%26+Lệ+Quyên&dates=20261229T093000Z/20261229T130000Z&details=Trân+trọng+kính+mời+bạn+đến+dự+lễ+thành+hôn+và+tiệc+cưới!&location=Số+1+Lương+Yên,+Bạch+Đằng,+Tp+Nghệ+An";

  // --- RSVP STATE ---
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState('yes');
  const [guestCount, setGuestCount] = useState('1');
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    setIsSubmittingRsvp(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'rsvp',
          name: rsvpName,
          status: rsvpStatus === 'yes' ? `Có tham dự (${guestCount} người)` : 'Rất tiếc không thể tham dự'
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#4a1c1d] font-serif relative overflow-x-hidden selection:bg-[#5c1d24] selection:text-white">
      {/* Nhạc nền */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-march-114008.mp3" 
      />

      {/* Nút nhạc cố định ở góc trên */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          className="w-10 h-10 rounded-full bg-[#5c1d24] text-white flex items-center justify-center shadow-md hover:scale-105 transition cursor-pointer border border-[#80232c]"
        >
          {isPlaying ? '🎵' : '🔇'}
        </button>
      </div>

      <div className="max-w-md mx-auto px-4 py-8 space-y-10">

        {/* 1. KHUNG BAO THƯ & SAVE THE DATE */}
        <section className="text-center space-y-4 pt-4">
          <p className="tracking-widest italic text-lg text-[#7c2830]">SAVE THE DATE</p>
          
          <div className="relative mx-auto w-full max-w-xs pt-6">
            {/* Ảnh cưới chèn trong phong bì */}
            <div className="relative z-10 w-4/5 mx-auto -mb-16 shadow-lg rounded-t-sm overflow-hidden border-4 border-white transform hover:-translate-y-2 transition duration-500">
              <img 
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600" 
                alt="Đức Mạnh & Lệ Quyên" 
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Hình dáng Phong bì Burgundy */}
            <div className="relative z-20 bg-[#5c1d24] text-white p-6 pt-12 rounded-b-xl shadow-xl border-t-2 border-[#80232c] text-center">
              <div className="w-12 h-12 bg-[#d4af37] rounded-full mx-auto flex items-center justify-center text-[#5c1d24] text-xl shadow-inner font-bold border-2 border-[#f3e5ab] -mt-16 mb-2">
                ❤️
              </div>
            </div>
          </div>
        </section>

        {/* 2. THÔNG TIN LỄ CƯỚI & TÊN HAI BÊN HỌ HÀNG */}
        <section className="bg-[#5c1d24] text-[#fceee9] p-6 md:p-8 rounded-3xl shadow-xl space-y-8 text-center relative overflow-hidden border border-[#7a252d]">
          <h2 className="text-2xl md:text-3xl tracking-wide uppercase font-semibold text-white border-b border-white/20 pb-4">
            THÔNG TIN LỄ CƯỚI
          </h2>

          <div className="grid grid-cols-2 gap-4 text-xs md:text-sm font-sans leading-relaxed">
            <div className="space-y-1 border-r border-white/20 pr-2">
              <p className="italic text-stone-300">Ông Bà</p>
              <p className="font-bold text-white text-sm md:text-base">Lê Văn Thắng</p>
              <p className="font-bold text-white text-sm md:text-base">Ngô Thị Ân</p>
              <p className="text-stone-300 text-xs pt-1">Ngô Quyền - Nghệ An</p>
            </div>

            <div className="space-y-1 pl-2">
              <p className="italic text-stone-300">Ông Bà</p>
              <p className="font-bold text-white text-sm md:text-base">Trần Đức Tuấn</p>
              <p className="font-bold text-white text-sm md:text-base">Trần Thị Nga</p>
              <p className="text-stone-300 text-xs pt-1">Ngô Quyền - Nghệ An</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <p className="uppercase text-xs tracking-widest text-stone-300">TRÂN TRỌNG BÁO TIN LỄ THÀNH HÔN CỦA CON CHÚNG TÔI</p>
            <h1 className="text-4xl font-serif text-white pt-2">Đức Mạnh</h1>
            <p className="text-2xl italic text-[#e6b800]">&</p>
            <h1 className="text-4xl font-serif text-white">Lệ Quyên</h1>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/20">
            <p className="uppercase text-xs tracking-widest text-stone-200">LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI TƯ GIA</p>
            <p className="text-sm">VÀO LÚC <span className="font-bold text-base">13:30</span></p>

            <div className="flex justify-center items-center gap-2 text-lg font-serif">
              <span>CHỦ NHẬT</span>
              <span className="text-4xl font-bold text-[#fceee9] px-3 py-1 border-x border-white/30">29</span>
              <span>THÁNG 12</span>
            </div>

            <p className="text-sm font-semibold">NĂM 2026</p>
            <p className="text-xs italic text-stone-300">(Tức ngày 11 tháng 11 năm Bính Ngọ)</p>
          </div>
        </section>

        {/* 3. BẢNG ĐẾM NGƯỢC & TỜ LỊCH THÁNG 12 */}
        <section className="bg-[#5c1d24] text-[#fceee9] p-6 md:p-8 rounded-3xl shadow-xl space-y-6 text-center border border-[#7a252d]">
          <h2 className="text-xl md:text-2xl uppercase font-semibold text-white">THÔNG TIN TIỆC CƯỚI</h2>
          <p className="text-sm">VÀO LÚC <span className="font-bold text-base">16:30</span></p>

          <div className="flex justify-center items-center gap-2 text-lg">
            <span>CHỦ NHẬT</span>
            <span className="text-4xl font-bold text-white px-3 py-1 border-x border-white/30">29</span>
            <span>THÁNG 12</span>
          </div>
          <p className="text-sm font-semibold">NĂM 2026</p>

          {/* Đếm ngược 4 ô */}
          <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs font-sans">
            <div className="bg-black/20 p-2 rounded-lg">
              <span className="block text-xl font-bold text-white">{timeLeft.days}</span>
              <span>ngày</span>
            </div>
            <div className="bg-black/20 p-2 rounded-lg">
              <span className="block text-xl font-bold text-white">{timeLeft.hours}</span>
              <span>giờ</span>
            </div>
            <div className="bg-black/20 p-2 rounded-lg">
              <span className="block text-xl font-bold text-white">{timeLeft.minutes}</span>
              <span>phút</span>
            </div>
            <div className="bg-black/20 p-2 rounded-lg">
              <span className="block text-xl font-bold text-white">{timeLeft.seconds}</span>
              <span>giây</span>
            </div>
          </div>

          {/* Tờ lịch Mini tháng 12 */}
          <div className="bg-[#42141a] p-4 rounded-2xl text-xs font-sans space-y-3 border border-white/10">
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-stone-300 pb-1 border-b border-white/10">
              <span>CN</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center font-medium">
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const isWeddingDay = day === 29;
                return (
                  <div 
                    key={day} 
                    className={`py-1 rounded-full flex items-center justify-center ${
                      isWeddingDay 
                        ? 'bg-[#c0392b] text-white font-bold ring-2 ring-yellow-400 scale-110 shadow-md' 
                        : 'text-stone-300'
                    }`}
                  >
                    {isWeddingDay ? '❤️ 29' : day}
                  </div>
                );
              })}
            </div>
          </div>

          <a 
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#fceee9] text-[#5c1d24] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white transition shadow-md"
          >
            Thêm vào lịch
          </a>
        </section>

        {/* 4. TIỆC CƯỚI TỔ CHỨC TẠI & DRESS CODE */}
        <section className="text-center space-y-6 bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-serif text-[#5c1d24] font-bold">TIỆC CƯỚI TỔ CHỨC TẠI</h2>
            <p className="text-sm font-sans text-stone-700">Số 1 Lương Yên, Bạch Đằng, Tp Nghệ An</p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-stone-100 p-4 text-center space-y-3">
            <p className="text-xs text-stone-500 font-sans">Bản đồ địa điểm tiệc cưới</p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#5c1d24] text-white px-5 py-2 rounded-lg text-xs font-sans font-medium hover:bg-[#7a252d] transition"
            >
              📍 Mở trong Google Maps ↗
            </a>
          </div>

          {/* DRESS CODE */}
          <div className="pt-4 space-y-3">
            <h3 className="text-lg font-bold tracking-wider text-[#5c1d24]">DRESS CODE</h3>
            <div className="flex justify-center gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-black shadow-md border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-[#801213] shadow-md border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-[#40080a] shadow-md border-2 border-white"></div>
            </div>
          </div>
        </section>

        {/* 5. FORM RSVP (XÁC NHẬN THAM DỰ) */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 text-stone-800 space-y-4">
          <h2 className="text-xl font-serif text-center text-[#5c1d24] font-bold">Xác nhận tham dự</h2>

          {!submitted ? (
            <form onSubmit={handleRsvpSubmit} className="space-y-4 text-sm font-sans">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Họ và tên</label>
                <input 
                  type="text" 
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Nhập tên của bạn"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5c1d24]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-stone-600">Bạn sẽ tham dự chứ?</label>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="rsvp" 
                      value="yes" 
                      checked={rsvpStatus === 'yes'} 
                      onChange={() => setRsvpStatus('yes')} 
                      className="accent-[#5c1d24]"
                    />
                    <span>Có, tôi sẽ tham dự</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="rsvp" 
                      value="no" 
                      checked={rsvpStatus === 'no'} 
                      onChange={() => setRsvpStatus('no')} 
                      className="accent-[#5c1d24]"
                    />
                    <span>Tôi bận, rất tiếc không thể tham dự</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Số lượng người tham dự</label>
                <select 
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5c1d24]"
                >
                  <option value="1">1 người</option>
                  <option value="2">2 người</option>
                  <option value="3">3 người (Đi cùng gia đình)</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isSubmittingRsvp}
                className="w-full py-2.5 bg-[#5c1d24] text-white rounded-lg font-medium hover:bg-[#7a252d] transition cursor-pointer disabled:opacity-50"
              >
                {isSubmittingRsvp ? 'Đang gửi...' : 'Gửi xác nhận'}
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-1">
              <p className="text-green-700 font-bold">Cảm ơn bạn đã xác nhận!</p>
              <p className="text-xs text-stone-500">Thông tin của bạn đã được lưu lại.</p>
            </div>
          )}
        </section>

        {/* 6. MỪNG CƯỚI & THANK YOU FOOTER */}
        <section className="text-center space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-4">
            <h2 className="text-xl font-serif text-[#5c1d24] font-bold uppercase tracking-wider">MỪNG CƯỚI</h2>
            
            <div className="w-32 h-32 mx-auto flex items-center justify-center bg-stone-50 rounded-2xl border border-stone-200 p-2">
              <img 
                src="https://api.vietqr.io/image/970422-123456789-n1q3.jpg?accountName=DUC%20MANH&amount=500000&addInfo=Mung%20cuoi%20Duc%20Manh%20Le%20Quyen" 
                alt="QR Code" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300";
                }}
              />
            </div>
            <p className="text-xs text-stone-500 font-sans">Quét mã QR để gửi lời chúc mừng & quà cưới online</p>
          </div>

          {/* Bức ảnh cảm ơn tràn viền */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl text-white text-center">
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" 
              alt="Thank you" 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end items-center space-y-2">
              <h3 className="text-3xl font-serif italic text-amber-200">Thank you</h3>
              <p className="text-xs font-sans leading-relaxed text-stone-200 max-w-xs">
                Cảm ơn Quý Khách đã dành tình cảm cho gia đình chúng tôi! Sự hiện diện của Quý Khách chính là món quà ý nghĩa nhất.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}