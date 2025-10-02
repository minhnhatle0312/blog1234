document.addEventListener('DOMContentLoaded', () => {
    // ==============================================
    // 1. ACCORDION TIMELINE LOGIC
    // ==============================================
    const titles = document.querySelectorAll('.timeline-title');

    titles.forEach(title => {
        title.addEventListener('click', () => {
            const details = title.nextElementSibling;
            
            // Đóng tất cả các mục khác
            titles.forEach(t => {
                if (t !== title && t.classList.contains('active')) {
                    t.classList.remove('active');
                    t.nextElementSibling.style.maxHeight = 0;
                }
            });

            // Mở/Đóng mục hiện tại
            title.classList.toggle('active');
            if (title.classList.contains('active')) {
                details.style.maxHeight = details.scrollHeight + "px";
            } else {
                details.style.maxHeight = 0;
            }
        });
    });

    // ==============================================
    // 2. MODAL LOGIC (Xem chi tiết dự án)
    // ==============================================
    const modal = document.getElementById("projectModal");
    const closeBtn = document.querySelector(".close-btn");
    const modalTitle = document.getElementById("modal-title");
    const modalContentArea = document.getElementById("modal-content-area");
    
    const projectDetails = {
        'green-cart': {
            title: "VisionFit: AI Gym Tracker - Chi Tiết Công Nghệ AI",
            features: [
            "<strong>Phân Tích Tư Thế Thời Gian Thực:</strong> Sử dụng thư viện OpenCV và MediaPipe để phát hiện 33 điểm xương khớp, theo dõi chuyển động 3D trong thời gian thực.",
            "<strong>Sửa Lỗi Tự Động:</strong> Mô hình Machine Learning được đào tạo để so sánh tư thế người dùng với tư thế chuẩn, cung cấp cảnh báo và hướng dẫn bằng giọng nói ngay lập tức.",
            "<strong>Dashboard Tiến Độ Cá Nhân:</strong> Ghi lại số lần lặp (reps), set, và chất lượng form tập (form quality score) trên React Native.",
            "<strong>Lưu Trữ Bất Biến:</strong> Dữ liệu tập luyện được mã hóa và lưu trữ trên cơ sở dữ liệu PostgreSQL an toàn, cho phép theo dõi quá trình tiến bộ chi tiết.",
            "<strong>Tính Năng Cộng Đồng:</strong> Cho phép người dùng chia sẻ thành tích và form tập được AI đánh giá (Social Sharing)."
            ]
        },
        'financial-dashboard': {
            title: "ArtChain: Sàn Giao Dịch NFT - Chức Năng Blockchain Cốt Lõi",
            features: [
            "<strong>Smart Contract (Solidity):</strong> Triển khai Hợp đồng Thông minh tuân thủ chuẩn ERC-721 (NFT độc nhất) trên mạng lưới Ethereum, đảm bảo tính sở hữu độc quyền.",
            "<strong>Giao Dịch Phi Tập Trung:</strong> Cho phép người dùng kết nối ví (MetaMask/Phantom) để Minting, Mua/Bán và Đấu giá NFT trực tiếp, loại bỏ trung gian.",
            "<strong>Hệ Thống Royalty Tự Động:</strong> Tích hợp logic trong Smart Contract để tự động trả tiền bản quyền (royalty) cho nghệ sĩ mỗi khi NFT được bán lại trên thị trường thứ cấp.",
            "<strong>Audit & Provenance:</strong> Mọi giao dịch và lịch sử sở hữu NFT được ghi lại bất biến trên Blockchain, cung cấp nguồn gốc (provenance) rõ ràng.",
            "<strong>Frontend Web3 (ReactJS):</strong> Xây dựng giao diện người dùng mượt mà, kết nối với chuỗi khối bằng Ethers.js/Web3.js."
            ]
        }
    };

    // Mở modal khi nhấn "Xem Chi Tiết"
    document.querySelectorAll('.btn-detail[data-open-modal]').forEach(button => {
        button.addEventListener('click', (event) => {
            const projectId = event.currentTarget.getAttribute('data-open-modal');
            const details = projectDetails[projectId];

            if (details) {
                modalTitle.textContent = details.title;
                
                const ul = document.createElement('ul');
                ul.classList.add('feature-list');
                details.features.forEach(featureText => {
                    const li = document.createElement('li');
                    li.innerHTML = featureText;
                    ul.appendChild(li);
                });

                modalContentArea.innerHTML = '';
                modalContentArea.appendChild(ul);

                modal.style.display = "block";
            }
        });
    });

    // Đóng modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    // ==============================================
    // 3. PROJECT CARD ACCORDION (Xem chức năng trong thẻ)
    // ==============================================
    const createFeatureList = (features) => {
        const ul = document.createElement('ul');
        ul.classList.add('feature-list');
        features.forEach(featureText => {
            const li = document.createElement('li');
            li.innerHTML = featureText;
            ul.appendChild(li);
        });
        return ul;
    };

    document.querySelectorAll('.btn-detail[data-toggle-detail]').forEach(button => {
        button.addEventListener('click', (event) => {
            const projectId = event.currentTarget.getAttribute('data-toggle-detail');
            const details = projectDetails[projectId];
            const card = event.currentTarget.closest('.project-card');
            const contentDiv = document.getElementById(`details-${projectId}`);

            if (!details || !contentDiv || !card) {
                console.error(`Không tìm thấy chi tiết hoặc thẻ HTML cho ID: ${projectId}`);
                return;
            }

            if (contentDiv.children.length === 0) {
                const featureList = createFeatureList(details.features);
                contentDiv.appendChild(featureList);
            }

            const isExpanded = card.classList.contains('expanded');

            // Đóng tất cả card khác
            document.querySelectorAll('.project-card.expanded').forEach(openCard => {
                if (openCard !== card) {
                    openCard.classList.remove('expanded');
                    const openButton = openCard.querySelector('.btn-detail');
                    if(openButton) {
                        openButton.textContent = 'Xem Chức Năng';
                    }
                }
            });

            if (isExpanded) {
                card.classList.remove('expanded');
                button.textContent = 'Xem Chức Năng';
            } else {
                card.classList.add('expanded');
                button.textContent = 'Thu Gọn';
            }
        });
    });
});

// JS thêm mới (đặt sau script toggleMenu của bạn)
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("formStatus").style.display = "block";
  this.reset();
});

// Hiệu ứng cuộn cho contact-info & contact-form
const fadeElements = document.querySelectorAll(".contact-info, .contact-form");
window.addEventListener("scroll", () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add("show");
    }
  });
});
