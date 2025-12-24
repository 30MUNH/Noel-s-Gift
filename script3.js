// ===== CẤU HÌNH =====
const CONFESSION_TEXT = "Hôm trước bạn bảo mâu thuẫn vì cô đơn nhưng mà không muốn yêu ai. Lý do là không yêu thì chán, còn yêu thì phiền. Tôi bảo là sẽ đưa cho bạn 1 phương án. Định nay gặp thì nói nhưng mà nay bạn có lịch rồi nên tôi sẽ để trên đây. Bạn nghĩ sao về tôi? Tôi muốn bắt đầu tìm hiểu bạn với tư cách là nam nữ tìm hiểu yêu nhau mà không phải là bạn bè. Câu trả lời của bạn là gì?";

const TYPING_SPEED = 50; // milliseconds mỗi ký tự
const BUTTON_SHOW_DELAY = 1000; // delay sau khi typing xong mới hiện buttons

// ===== BIẾN GLOBAL =====
let typingIndex = 0;
let typingInterval = null;
let noButtonClickCount = 0;

// ===== KHỞI TẠO KHI TRANG LOAD =====
jQuery(document).ready(function () {
    startTypingAnimation();
    setupButtonHandlers();
});

// ===== HIỆU ỨNG TYPING =====
function startTypingAnimation() {
    const textElement = jQuery('#confession-text');
    const cursor = jQuery('#typing-cursor');

    // Khởi tạo một text node để chứa text
    let currentText = '';

    // Bắt đầu typing
    typingInterval = setInterval(function () {
        if (typingIndex < CONFESSION_TEXT.length) {
            currentText += CONFESSION_TEXT.charAt(typingIndex);
            // Clear và thêm lại text + cursor
            textElement.html(currentText + cursor[0].outerHTML);
            typingIndex++;
        } else {
            // Typing xong
            clearInterval(typingInterval);
            cursor.fadeOut(300);

            // Hiện buttons sau một khoảng delay
            setTimeout(function () {
                jQuery('#button-container').fadeIn(800);
            }, BUTTON_SHOW_DELAY);
        }
    }, TYPING_SPEED);
}

// ===== XỬ LÝ BUTTONS =====
function setupButtonHandlers() {
    // Button YES - hiện success message
    jQuery('#btn-yes').on('click', function () {
        jQuery(this).addClass('clicked');

        // Hiện success message
        setTimeout(function () {
            jQuery('#success-message').fadeIn(500);
            createFloatingHearts();
        }, 300);
    });

    // Button NO - chạy tránh chuột (playful interaction)
    jQuery('#btn-no').on('mouseenter', function () {
        noButtonClickCount++;

        if (noButtonClickCount >= 3) {
            // Sau 3 lần hover, button No biến mất
            jQuery(this).fadeOut(300, function () {
                // Phóng to button Yes
                jQuery('#btn-yes').css({
                    'transform': 'scale(1.2)',
                    'animation': 'pulse 1s ease-in-out infinite'
                });
            });
        } else {
            // Di chuyển button đến vị trí random
            moveButtonRandomly(jQuery(this));
        }
    });

    // Fallback: nếu cố click vào No
    jQuery('#btn-no').on('click', function () {
        alert('Ối! Button này bị lỗi rồi 😅 Thử button bên cạnh xem! 💕');
    });
}

// ===== DI CHUYỂN BUTTON RANDOM =====
function moveButtonRandomly(button) {
    const container = jQuery('.button-container');
    const containerWidth = container.width();
    const containerHeight = container.height();
    const buttonWidth = button.outerWidth();
    const buttonHeight = button.outerHeight();

    // Tính toán vị trí random (trong phạm vi container)
    const maxX = containerWidth - buttonWidth;
    const maxY = 100; // Giới hạn di chuyển theo chiều dọc

    const randomX = Math.random() * maxX;
    const randomY = (Math.random() - 0.5) * maxY;

    // Make button absolute positioned
    if (button.css('position') !== 'absolute') {
        const currentPos = button.position();
        button.css({
            'position': 'absolute',
            'left': currentPos.left + 'px',
            'top': currentPos.top + 'px'
        });
    }

    // Di chuyển đến vị trí mới
    button.animate({
        left: randomX + 'px',
        top: randomY + 'px'
    }, 200);
}

// ===== TẠO HIỆU ỨNG TRÁi TIM BAY =====
function createFloatingHearts() {
    const colors = ['❤️', '💕', '💖', '💝', '💗', '💓'];

    for (let i = 0; i < 20; i++) {
        setTimeout(function () {
            const heart = jQuery('<div class="floating-heart"></div>');
            heart.text(colors[Math.floor(Math.random() * colors.length)]);
            heart.css({
                'position': 'fixed',
                'left': Math.random() * 100 + '%',
                'bottom': '-50px',
                'font-size': (Math.random() * 30 + 20) + 'px',
                'z-index': 9999,
                'animation': 'floatUp ' + (Math.random() * 3 + 3) + 's ease-out forwards'
            });

            jQuery('body').append(heart);

            // Remove sau khi animation xong
            setTimeout(function () {
                heart.remove();
            }, 6000);
        }, i * 100);
    }
}

// ===== CSS ANIMATION CHO TRÁI TIM BAY =====
// Thêm animation vào document
jQuery(document).ready(function () {
    const style = jQuery('<style></style>');
    style.text(`
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1.2);
            }
            50% {
                transform: scale(1.3);
            }
        }
        
        .btn.clicked {
            animation: clickPulse 0.3s ease-out;
        }
        
        @keyframes clickPulse {
            0% { transform: scale(1); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
        }
    `);
    jQuery('head').append(style);
});
