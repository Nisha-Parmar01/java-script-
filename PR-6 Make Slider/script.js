var slides = [
    { 
      src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&h=400&q=80", 
      title: "Powerful Laptop", 
      desc: "Boost your productivity with high-performance laptops designed for developers and gamers."
    },
    { 
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&h=400&q=80", 
      title: "Coding Workspace", 
      desc: "A modern workstation with multiple monitors, perfect for coding, designing, and multitasking."
    },
    { 
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&h=400&q=80", 
      title: "Creative Desktop", 
      desc: "A stylish desktop setup with powerful graphics and sleek design for creators and professionals."
    }
  ];

  let current = 0;

  let sliderImg = document.getElementById("slider-img");
  let titleEl = document.getElementById("title");
  let descEl = document.getElementById("desc");
  let prevBtn = document.getElementById("prev");
  let nextBtn = document.getElementById("next");

  function showSlide(index) {
    let s = slides[index];
    sliderImg.setAttribute("src", s.src);
    titleEl.innerHTML = s.title;
    descEl.innerHTML = s.desc + ` (${index+1}/${slides.length})`;
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  var autoplayInterval = null;
  function startAutoPlay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  showSlide(current);
  startAutoPlay();