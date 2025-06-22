import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">من نحن</h1>
          <p className="text-xl text-gray-600">
            تعرف على مدونة الاتصالات ورسالتنا في نشر المعرفة التقنية
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">رسالتنا</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                مدونة الاتصالات هي منصة رائدة في نشر أحدث الأخبار والمقالات التقنية في مجال الاتصالات والتكنولوجيا. 
                نهدف إلى تقديم محتوى عالي الجودة يساعد القراء على فهم التطورات التقنية المعاصرة وتأثيرها على حياتهم اليومية.
              </p>
              <p className="text-gray-700 leading-relaxed">
                نؤمن بأهمية المعرفة التقنية في عصرنا الحالي، ونسعى لجعلها متاحة للجميع بأسلوب سهل ومفهوم.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">رؤيتنا</h2>
              <p className="text-gray-700 leading-relaxed">
                نطمح لأن نكون المرجع الأول في المحتوى التقني العربي، ونساهم في نشر الوعي التقني في المنطقة العربية 
                من خلال تقديم مقالات متخصصة ودقيقة تغطي أحدث التطورات في عالم التكنولوجيا والاتصالات.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">ما نقدمه</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">مقالات تقنية متخصصة</h3>
                  <p className="text-gray-700">
                    نقدم مقالات عميقة ومفصلة حول أحدث التقنيات والاتجاهات في مجال الاتصالات.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">أخبار التكنولوجيا</h3>
                  <p className="text-gray-700">
                    نغطي أهم الأخبار والتطورات في عالم التكنولوجيا بشكل يومي ومستمر.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">دراسات وتحليلات</h3>
                  <p className="text-gray-700">
                    نوفر تحليلات معمقة للاتجاهات التقنية وتأثيرها على السوق والمجتمع.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">أدلة ونصائح</h3>
                  <p className="text-gray-700">
                    نقدم أدلة عملية ونصائح مفيدة لمساعدة القراء في استخدام التقنيات الحديثة.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">فريق العمل</h2>
              <p className="text-gray-700 leading-relaxed">
                يضم فريق مدونة الاتصالات نخبة من الكتاب والمتخصصين في مجال التكنولوgiا والاتصالات، 
                الذين يتمتعون بخبرة واسعة وشغف كبير بمتابعة أحدث التطورات التقنية ونقلها للقراء بأسلوب واضح ومفيد.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
