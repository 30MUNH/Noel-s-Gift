// Biến lưu thời gian bắt đầu và thời gian timeout
var giftClickTime = null;
var TIMEOUT_DURATION = 10000; // 10 giây

jQuery(document).ready(function () {
    giftOpen();
});

//Gift Open

function giftOpen() {
    jQuery("section.gift").on("click", function () {
        // Lưu thời gian click vào hộp quà
        giftClickTime = new Date().getTime();

        jQuery(".error").hide();
        jQuery(".lbWrapper,.lbWrapper .signupWrapper").hide();
        jQuery(".gift-top").removeClass("hovered");
        jQuery(".gift-text").hide();

        jQuery(".gift-final-text").show();
        jQuery(".gift-bottom").addClass("fadeout");
        jQuery(".gift-top").addClass("fadeout");

        // Bắt đầu countdown ngay sau khi click
        startCountdown();

        //jQuery(".santa-wrapper").fadeIn(5000);
        setTimeout(function () {
            jQuery(".santa-wrapper").fadeIn(5000);
        }, 500);
        // Hiển thị cây thông TRƯỚC (1 giây sau khi click)
        setTimeout(function () {
            jQuery("#merry").fadeIn(1500);
        }, 1000);

        // Hiển thị người tuyết VÀ nai CÙNG LÚC (3 giây sau khi click)
        setTimeout(function () {
            jQuery("#box").fadeIn(1000);  // Người tuyết
            jQuery("#houu").fadeIn(1000); // Nai (sẽ hiện ở lớp trên)

            // Sau khi TẤT CẢ animation hiện xong, enable click để chuyển trang
            enablePageTransition();
        }, 3000);

        // Hiển thị người tuyết CUỐI CÙNG (5 giây sau khi click)
        setTimeout(function () {
            jQuery("#box").fadeIn(1000);

            // Sau khi TẤT CẢ animation hiện xong, enable click để chuyển trang
            enablePageTransition();
        }, 5000);
        //jQuery(".gift-card-text").fadeIn(5000);

    });
}

// Bắt đầu countdown
function startCountdown() {
    var countdownInterval = setInterval(function () {
        var currentTime = new Date().getTime();
        var elapsedTime = currentTime - giftClickTime;
        var remainingTime = TIMEOUT_DURATION - elapsedTime;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            goToNextPage();
        }
    }, 100); // Update mỗi 100ms để chính xác hơn

    // Lưu interval ID để có thể clear khi cần
    window.countdownIntervalId = countdownInterval;
}

// Hàm chuyển trang
function goToNextPage() {
    // Clear countdown interval nếu có
    if (window.countdownIntervalId) {
        clearInterval(window.countdownIntervalId);
    }
    window.location.href = "CayThong.html";
}

// Hàm enable click để chuyển trang sau khi animation hiện
function enablePageTransition() {
    // Click vào các phần đã hiện để chuyển trang ngay
    var clickHandler = function () {
        if (window.countdownIntervalId) {
            clearInterval(window.countdownIntervalId);
        }
        goToNextPage();
    };

    // Thêm event listener click vào body (sau khi animation đã hiện)
    jQuery("body").on("click", clickHandler);

    // Hoặc nhấn phím bất kỳ
    jQuery(document).on("keydown", function () {
        if (window.countdownIntervalId) {
            clearInterval(window.countdownIntervalId);
        }
        goToNextPage();
    });
}

//Snow Fall

function createSnow() {

    var particles = [];
    var particleSize = 3;
    var maxParticles = 1000;
    var particleOpacity = .9;

    // Initialize canvas
    var canvas = document.getElementById('snow');
    var ctx = canvas.getContext('2d');

    // Get window width & height
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // Apply canvas size based on window width & height.
    // This can be changed to bound within an element instead.
    canvas.width = windowWidth;
    canvas.height = windowHeight;

    // Push particle iteration
    for (var i = 0; i < maxParticles; i++) {

        particles.push({

            // Particle x position
            x: Math.random() * windowWidth,

            // Particle y position
            y: Math.random() * windowHeight,

            // Particle radius
            r: Math.random(Math.min(particleSize)) * particleSize,

            // Particle density 
            d: Math.random() * maxParticles,
        });
    }

    // Render particles
    function render() {

        ctx.clearRect(0, 0, windowWidth, windowHeight);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + particleOpacity + ')';
        ctx.beginPath();

        for (var i = 0; i < maxParticles; i++) {

            // Iterate the particles.
            var p = particles[i];

            // Move particles along x, y.
            ctx.moveTo(p.x, p.y);

            // Draw particle.
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }

        ctx.fill();
        update();
    }

    // To create a more dynamic and organic flow, we need to apply an
    // incremental 'angle' that will iterate through each particle flow.
    var angle = 0.005;

    // Update particles
    function update() {

        // Incremental angle.
        angle += 0.005;

        for (var i = 0; i < maxParticles; i++) {

            var p = particles[i];

            // Offset the particles flow based on the angle.
            p.y += Math.cos(p.d) + p.r;
            p.x += Math.sin(angle) * Math.PI / 10;

            // Re-iterate the particles to the top once the particle has
            // reached the bottom of the window.
            if (p.y > windowHeight) {

                particles[i] = {

                    x: Math.random() * windowWidth,
                    y: 0,
                    r: p.r,
                    d: p.d
                };
            }
        }
    }


    // Call function.

}
