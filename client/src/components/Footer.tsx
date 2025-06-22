import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">مدونة الاتصالات</h4>
            <p className="text-gray-300 mb-4">
              منصة رائدة في نشر أحدث الأخبار والمقالات التقنية في مجال الاتصالات والتكنولوجيا.
            </p>
            <div className="flex space-x-reverse space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">الرئيسية</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">المقالات</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">من نحن</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">التصنيفات</h4>
            <ul className="space-y-2">
              <li><Link href="/blog?category=networks" className="text-gray-300 hover:text-white transition-colors">شبكات الاتصال</Link></li>
              <li><Link href="/blog?category=cybersecurity" className="text-gray-300 hover:text-white transition-colors">الأمن السيبراني</Link></li>
              <li><Link href="/blog?category=ai" className="text-gray-300 hover:text-white transition-colors">الذكاء الاصطناعي</Link></li>
              <li><Link href="/blog?category=iot" className="text-gray-300 hover:text-white transition-colors">إنترنت الأشياء</Link></li>
              <li><Link href="/blog?category=cloud" className="text-gray-300 hover:text-white transition-colors">الحوسبة السحابية</Link></li>
              <li><Link href="/blog?category=emerging" className="text-gray-300 hover:text-white transition-colors">تقنيات ناشئة</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">قانوني</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">الشروط والأحكام</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2024 مدونة الاتصالات. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
