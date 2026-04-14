function AboutUs() {
  return (
    <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', marginTop: '20px' }}>
      <header>
        <h1>ℹ️ Giới thiệu về chúng tôi</h1>
      </header>
      <div style={{ marginTop: '30px', background: 'rgba(255, 255, 255, 0.4)', padding: '30px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '20px' }}>
          Chào mừng bạn đến với ứng dụng <strong>Quản lý chi tiêu</strong>.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
          Ứng dụng này được thiết kế để giúp bạn dễ dàng theo dõi thu nhập và các khoản chi tiêu hàng ngày một cách trực quan và khoa học nhất.
          Với các biểu đồ thống kê chi tiết, bạn có thể dễ dàng đánh giá tình hình tài chính của mình và đưa ra các kế hoạch chi tiêu hợp lý hơn trong tương lai.
          Đây là sản phẩm được phát triển bởi các thành viên nhóm:
          <br />Trương Trần Đình Minh
          <br />Nguyễn Ngọc Hoàng
          <br />Lê Hồng Thái

        </p>
      </div>
    </div>
  );
}

export default AboutUs;
