import React, { useState, useEffect, useRef } from 'react';

// URL Google Apps Script của bạn
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyEtcZI-_AtWXo_SLuzR7mgYN61xvHbQJ1OSVI3LyccXO-kI-zWXkgvWwbpoIcG3R54RQ/exec";

export default function App() {
  // Trạng thái mở phong bì
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // --- HIỆU ỨNG THẢ TIM ---
  const [hearts, setHearts] = useState([]);

  const addHeart = (e) => {
    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 80 + 10, // Vị trí ngẫu nhiên chiều ngang (%)
    };
    setHearts((prev) => [...prev, newHeart]);

    // Tự động xóa trái tim sau 2.5 giây khi hiệu ứng bay kết thúc
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2500);
  };

  // --- NHẠC NỀN ĐÁM CƯỚI ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.log("Lỗi phát nhạc:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    const invitationEl = document.getElementById('invitation');
    if (invitationEl) {
      invitationEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- THỜI GIAN ĐẾM NGƯỢC ---
  const weddingDate = new Date('2026-12-01T00:00:00');
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

  // --- LINK GOOGLE CALENDAR ---
  const googleCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Đám+Cưới+Đức+Nam+%26+Thảo+Vy&dates=20261201T100000Z/20261201T140000Z&details=Trân+trọng+kính+mời+bạn+đến+dự+lễ+thành+hôn+và+tiệc+cưới+của+Đức+Nam+%26+Thảo+Vy!&location=White+Palace,+588+Hoàng+Văn+Thụ,+Tân+Bình,+TP.HCM";

  // --- CÂU CHUYỆN TÌNH YÊU ---
  const loveStory = [
    {
      date: '10 / 2022',
      title: 'Lần Đầu Gặp Gỡ',
      description: 'Chúng mình vô tình gặp nhau trong một buổi tiệc của người bạn chung. Ánh mắt đầu tiên trao nhau đã mở đầu cho câu chuyện tình yêu đầy ngọt ngào.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600'
    },
    {
      date: '02 / 2023',
      title: 'Buổi Hẹn Hò Đầu Tiên',
      description: 'Chuyến đi cà phê cuối tuần và những cuộc trò chuyện kéo dài suốt nhiều giờ liền mà cả hai không muốn dừng lại.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=600'
    },
    {
      date: '12 / 2025',
      title: 'Lời Cầu Hôn Vỡ Òa',
      description: 'Dưới ánh đèn lãng mạn bên bờ biển, lời hứa trọn đời đã được thốt ra cùng chiếc nhẫn đính hôn lấp lánh.',
      image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=600'
    },
    {
      date: '12 / 2026',
      title: 'Ngày Chung Đôi',
      description: 'Chính thức về chung một nhà, bắt đầu hành trình xây dựng tổ ấm hạnh phúc vững bền.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600'
    }
  ];

  // --- ALBUM ẢNH ---
  const galleryImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
  ];

  const [selectedImg, setSelectedImg] = useState(null);

  // --- RSVP & LỜI CHÚC ---
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState('yes');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);

  const [wishes, setWishes] = useState([
    { name: 'Minh Tuấn', message: 'Chúc hai bạn trăm năm hạnh phúc!' },
    { name: 'Hồng Nhung', message: 'Happy Wedding! Sớm có em bé nhé hai bạn ơi.' }
  ]);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);

  const [activeModal, setActiveModal] = useState(null);

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
          status: rsvpStatus === 'yes' ? 'Tham dự 🎉' : 'Không tham dự 🥲'
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Lỗi khi gửi RSVP:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  const handleWishSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;

    setIsSubmittingWish(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'wish',
          name: guestName,
          message: guestMessage
        }),
      });

      setWishes([{ name: guestName, message: guestMessage }, ...wishes]);
      setGuestName('');
      setGuestMessage('');
      alert("Cảm ơn bạn đã gửi lời chúc ý nghĩa!");
    } catch (error) {
      console.error("Lỗi khi gửi lời chúc:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setIsSubmittingWish(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans relative overflow-x-hidden">
      {/* THẺ AUDIO ẨN */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-march-114008.mp3" 
      />

      {/* THANH NAVIGATION MENU CỐ ĐỊNH */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200/50 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="#" className="font-serif text-lg font-bold tracking-wider text-stone-800">
            N & V
          </a>
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm font-medium text-stone-600">
            <a href="#about" className="hover:text-amber-700 transition">Lời Ngỏ</a>
            <a href="#story" className="hover:text-amber-700 transition">Câu Chuyện</a>
            <a href="#gallery" className="hover:text-amber-700 transition">Album</a>
            <a href="#event" className="hover:text-amber-700 transition">Sự Kiện</a>
            <a href="#rsvp" className="hover:text-amber-700 transition">RSVP</a>
            <a href="#wishes" className="hover:text-amber-700 transition">Lời Chúc</a>
          </div>
        </div>
      </nav>

      {/* NÚT TƯƠNG TÁC GÓC DƯỚI BÊN TRÁI & BÊN PHẢI */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        {/* Nút bật/tắt nhạc */}
        <button
          onClick={toggleMusic}
          className={`p-3.5 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center cursor-pointer ${
            isPlaying 
              ? 'bg-amber-600 text-white scale-110' 
              : 'bg-white text-stone-700 border border-stone-200 hover:scale-105'
          }`}
          title={isPlaying ? "Tắt nhạc" : "Bật nhạc nền"}
        >
          {isPlaying ? <span className="text-xl">🎵</span> : <span className="text-xl">🔇</span>}
        </button>

        {/* Nút Bắn Trái Tim */}
        <button
          onClick={addHeart}
          className="p-3.5 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 hover:scale-110 active:scale-95 transition duration-300 cursor-pointer flex items-center justify-center"
          title="Bắn tim chúc mừng"
        >
          <span className="text-xl">💖</span>
        </button>
      </div>

      {/* HIỂN THỊ CÁC TRÁI TIM BAY NỔI */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="fixed bottom-10 z-50 pointer-events-none text-2xl animate-bounce"
          style={{
            left: `${h.left}%`,
            transition: 'all 2.5s ease-out',
            animation: 'ping 1s infinite alternate'
          }}
        >
          ❤️
        </div>
      ))}

      {/* 1. Header / Hero Section */}
      <header className="relative h-screen flex flex-col items-center justify-center bg-stone-900 text-white text-center px-4 pt-12">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920')` }}
        ></div>

        <div className="z-20 max-w-2xl mx-auto space-y-4">
          <p className="tracking-widest uppercase text-sm font-light text-stone-200">Save The Date</p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-wide">Đức Nam & Thảo Vy</h1>
          <p className="text-lg font-light text-stone-300">01 . 12 . 2026</p>
          
          {/* Bộ đếm ngược */}
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto pt-4 pb-2">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
              <span className="text-2xl md:text-3xl font-bold font-serif">{timeLeft.days}</span>
              <p className="text-xs uppercase tracking-wider text-stone-300">Ngày</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
              <span className="text-2xl md:text-3xl font-bold font-serif">{timeLeft.hours}</span>
              <p className="text-xs uppercase tracking-wider text-stone-300">Giờ</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
              <span className="text-2xl md:text-3xl font-bold font-serif">{timeLeft.minutes}</span>
              <p className="text-xs uppercase tracking-wider text-stone-300">Phút</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
              <span className="text-2xl md:text-3xl font-bold font-serif">{timeLeft.seconds}</span>
              <p className="text-xs uppercase tracking-wider text-stone-300">Giây</p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button 
              onClick={handleOpenEnvelope}
              className="border border-white/80 px-8 py-3 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-stone-900 transition duration-300 cursor-pointer shadow-lg"
            >
              ✉️ Mở Thiệp Mời
            </button>

            <a 
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600/90 hover:bg-amber-600 text-white px-6 py-3 rounded-full text-sm uppercase tracking-widest transition duration-300 shadow-lg flex items-center gap-2"
            >
              📅 Thêm Vào Lịch
            </a>
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main id="invitation" className="max-w-4xl mx-auto px-4 py-16 space-y-20">
        
        {/* Lời ngỏ */}
        <section id="about" className="text-center space-y-6 pt-8">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-700">Trân trọng kính mời</h2>
          <p className="max-w-xl mx-auto text-stone-600 leading-relaxed font-light">
            "Tình yêu không phải là nhìn nhau, mà là cùng nhau nhìn về một hướng." Sự hiện diện của bạn là niềm vinh hạnh lớn cho gia đình chúng tôi trong ngày vui trọng đại này.
          </p>
        </section>

        {/* CÂU CHUYỆN TÌNH YÊU (TIMELINE) */}
        <section id="story" className="space-y-12 pt-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Love Story</span>
            <h3 className="text-2xl md:text-3xl font-serif text-stone-700">Câu Chuyện Tình Yêu</h3>
          </div>

          <div className="relative border-l-2 border-stone-200 ml-4 md:ml-32 space-y-12">
            {loveStory.map((item, index) => (
              <div key={index} className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-600 border-4 border-stone-50 group-hover:scale-125 transition duration-300"></div>
                
                <div className="grid md:grid-cols-3 gap-6 items-center bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                  <div className="md:col-span-1 overflow-hidden rounded-xl h-40">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <span className="text-xs font-serif text-amber-700 bg-amber-50 px-3 py-1 rounded-full font-medium">{item.date}</span>
                    <h4 className="text-xl font-serif text-stone-800 font-medium pt-1">{item.title}</h4>
                    <p className="text-sm text-stone-600 font-light leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ALBUM ẢNH CƯỚI */}
        <section id="gallery" className="space-y-6 pt-8">
          <h3 className="text-2xl md:text-3xl font-serif text-center text-stone-700">Album Kỷ Niệm</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((imgUrl, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedImg(imgUrl)}
                className="overflow-hidden rounded-2xl cursor-pointer group shadow-sm bg-stone-200 aspect-square"
              >
                <img 
                  src={imgUrl} 
                  alt={`Wedding moment ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Địa điểm tổ chức & Google Maps */}
        <section id="event" className="space-y-8 pt-8">
          <h3 className="text-2xl md:text-3xl font-serif text-center text-stone-700">Địa Điểm Tổ Chức</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-between space-y-6">
              <div className="space-y-3 text-center">
                <span className="text-xs uppercase tracking-widest px-3 py-1 bg-stone-100 rounded-full text-stone-600">Nhà Gái</span>
                <h4 className="text-2xl font-serif text-stone-700">Lễ Thành Hôn</h4>
                <p className="text-stone-500 font-light text-sm">10:00 Sáng - 01/12/2026</p>
                <p className="text-stone-700 font-medium">Tư gia Nhà Gái</p>
                <p className="text-sm text-stone-500">Số 123 Đường Hoa Hồng, Quận 1, TP.HCM</p>
              </div>
              <div className="pt-2">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 border border-stone-300 rounded-lg text-sm text-stone-700 hover:bg-stone-50 transition duration-300 font-medium"
                >
                  📍 Xem bản đồ Google Maps
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-between space-y-6">
              <div className="space-y-3 text-center">
                <span className="text-xs uppercase tracking-widest px-3 py-1 bg-stone-100 rounded-full text-stone-600">Nhà Trai & Tiệc Cưới</span>
                <h4 className="text-2xl font-serif text-stone-700">Tiệc Cưới Trọng Đại</h4>
                <p className="text-stone-500 font-light text-sm">18:00 Chiều - 01/12/2026</p>
                <p className="text-stone-700 font-medium">Trung Tâm Hội Nghị White Palace</p>
                <p className="text-sm text-stone-500">Số 588 Hoàng Văn Thụ, Phường 4, Tân Bình, TP.HCM</p>
              </div>
              <div className="pt-2">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 border border-stone-300 rounded-lg text-sm text-stone-700 hover:bg-stone-50 transition duration-300 font-medium"
                >
                  📍 Xem bản đồ Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Hộp mừng cưới (QR Code) */}
        <section className="bg-stone-100 p-8 md:p-12 rounded-3xl max-w-xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-serif text-stone-700">Hộp Mừng Cưới</h3>
            <p className="text-stone-500 text-sm font-light">
              Món quà lớn nhất đối với chúng tôi chính là sự hiện diện của bạn. Nếu bạn muốn gửi lời chúc mừng qua quà cưới, có thể gửi qua hộp quà online dưới đây:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <button 
              onClick={() => setActiveModal('groom')}
              className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-stone-400 transition duration-300 text-center space-y-1 cursor-pointer"
            >
              <p className="font-serif text-stone-800 font-medium">Chú Rể</p>
              <p className="text-xs text-stone-500">Đức Nam (Techcombank)</p>
              <span className="inline-block text-xs text-stone-700 underline pt-1 font-medium">Xem QR Chuyển Khoản</span>
            </button>

            <button 
              onClick={() => setActiveModal('bride')}
              className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-stone-400 transition duration-300 text-center space-y-1 cursor-pointer"
            >
              <p className="font-serif text-stone-800 font-medium">Cô Dâu</p>
              <p className="text-xs text-stone-500">Thảo Vy (Vietcombank)</p>
              <span className="inline-block text-xs text-stone-700 underline pt-1 font-medium">Xem QR Chuyển Khoản</span>
            </button>
          </div>
        </section>

        {/* RSVP (Xác nhận tham dự) */}
        <section id="rsvp" className="bg-white p-8 md:p-12 rounded-3xl max-w-xl mx-auto border border-stone-100 shadow-sm pt-8">
          <h3 className="text-2xl font-serif text-center mb-6 text-stone-700">Xác Nhận Tham Dự (RSVP)</h3>
          {!submitted ? (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Tên của bạn / Gia đình:</label>
                <input 
                  type="text" 
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Nhập họ tên..."
                  required
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Bạn sẽ tham dự chứ?</label>
                <select 
                  value={rsvpStatus}
                  onChange={(e) => setRsvpStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50/50"
                >
                  <option value="yes">Chắc chắn mình sẽ tham dự 🎉</option>
                  <option value="no">Rất tiếc mình không thể tham dự 🥲</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={isSubmittingRsvp}
                className="w-full py-3 bg-stone-800 text-white rounded-lg font-medium hover:bg-stone-700 transition duration-300 cursor-pointer disabled:opacity-50"
              >
                {isSubmittingRsvp ? 'Đang gửi...' : 'Gửi Xác Nhận'}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-2">
              <h4 className="text-xl font-serif text-green-700">Cảm ơn bạn đã phản hồi!</h4>
              <p className="text-stone-600 text-sm">Thông tin của bạn đã được lưu vào danh sách khách mời.</p>
            </div>
          )}
        </section>

        {/* Sổ lưu bút / Gửi lời chúc */}
        <section id="wishes" className="space-y-8 max-w-xl mx-auto pt-8">
          <h3 className="text-2xl font-serif text-center text-stone-700">Sổ Lưu Bút & Lời Chúc</h3>
          
          <form onSubmit={handleWishSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 space-y-4">
            <div>
              <input 
                type="text" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Tên của bạn..."
                required
                className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <div>
              <textarea 
                value={guestMessage}
                onChange={(e) => setGuestMessage(e.target.value)}
                placeholder="Viết lời chúc gửi đến cô dâu chú rể..."
                rows="3"
                required
                className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isSubmittingWish}
              className="w-full py-2.5 bg-stone-700 text-white rounded-lg font-medium hover:bg-stone-600 transition duration-300 text-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmittingWish ? 'Đang gửi...' : 'Gửi Lời Chúc'}
            </button>
          </form>

          <div className="space-y-4">
            {wishes.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border border-stone-100 shadow-xs space-y-1">
                <h5 className="font-medium text-stone-800 text-sm">{item.name}</h5>
                <p className="text-stone-600 text-sm font-light">{item.message}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-center py-8 text-sm">
        <p>Made with ❤️ by Đức Nam & Thảo Vy</p>
      </footer>

      {/* LIGHTBOX PHÓNG TO ẢNH */}
      {selectedImg && (
        <div 
          onClick={() => setSelectedImg(null)} 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl">
            <img src={selectedImg} alt="Enlarged" className="w-full h-full object-contain" />
          </div>
        </div>
      )}

      {/* MODAL QR MỪNG CƯỚI */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-xl">
            <h4 className="text-xl font-serif text-stone-800">
              {activeModal === 'groom' ? 'Mừng Cưới Chú Rể (Đức Nam)' : 'Mừng Cưới Cô Dâu (Thảo Vy)'}
            </h4>
            
            <div className="bg-stone-100 p-4 rounded-2xl flex items-center justify-center">
              <img 
                src="https://api.vietqr.io/image/970422-123456789-n1q3.jpg?accountName=DUC%20NAM&amount=500000&addInfo=Mung%20cuoi%20Duc%20Nam%20Thao%20Vy" 
                alt="QR Code Mừng Cưới"
                className="w-60 h-60 object-contain rounded-lg shadow-sm"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400";
                }}
              />
            </div>

            <div className="text-sm text-stone-600 space-y-1">
              <p><span className="font-medium">Ngân hàng:</span> {activeModal === 'groom' ? 'Techcombank' : 'Vietcombank'}</p>
              <p><span className="font-medium">Số tài khoản:</span> 1234 5678 9999</p>
              <p><span className="font-medium">Chủ tài khoản:</span> {activeModal === 'groom' ? 'VU DUC NAM' : 'LE THAO VY'}</p>
            </div>

            <button 
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-stone-800 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition duration-300 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}