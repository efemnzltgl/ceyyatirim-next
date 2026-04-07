import type {StructureResolver} from 'sanity/structure'
import { Settings, Home, Building, Blocks, Users, MapPin, Briefcase, Info, FileText, Image as ImageIcon, BriefcaseBusiness, UsersIcon, Smile, Send, Map } from 'lucide-react'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Tüm İçerikler')
    .items([
      // 1. AYARLAR (SINGLETON)
      S.listItem()
        .title('Site Ayarları')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('9c4e3ac6-20b3-49dd-8106-0a9f78ef939a')
            .title('Genel Site Ayarları')
        ),

      S.divider(),

      // 2. KURUMSAL BÖLÜMÜ
      S.listItem()
        .title('Kurumsal Yönetim')
        .icon(Building)
        .child(
          S.list()
            .title('Kurumsal İçerikler')
            .items([
              S.listItem()
                .title('Ana Sayfa Arka Plan (Görsel/Video)')
                .icon(ImageIcon)
                .child(
                  S.document()
                    .schemaType('hero')
                    .documentId('homeMedia')
                    .title('Ana Sayfa Medya Ayarları')
                ),
              S.documentTypeListItem('company').title('Grup Şirketleri').icon(Blocks),
              S.documentTypeListItem('page').title('Kurumsal Sayfalar').icon(Info),
            ])
        ),

      S.divider(),

      // 3. FAALİYET ALANI & PROJELER
      S.listItem()
        .title('Projeler ve Sektörler')
        .icon(BriefcaseBusiness)
        .child(
          S.list()
            .title('Faaliyetlerimiz')
            .items([
              S.documentTypeListItem('project').title('Tüm Projelerimiz').icon(Building),
              S.documentTypeListItem('sector').title('Hizmet Sektörlerimiz').icon(Blocks),
            ])
        ),

      S.divider(),

      // 4. İNSAN KAYNAKLARI
      S.listItem()
        .title('İnsan Kaynakları')
        .icon(Users)
        .child(
          S.list()
            .title('İnsan Kaynakları Yönetimi')
            .items([
              S.documentTypeListItem('humanResources').title('İK Sayfası ve Misyon').icon(FileText),
              S.documentTypeListItem('socialActivity').title('Sosyal Sorumluluk & Aktiviteler').icon(Smile),
              S.documentTypeListItem('jobApplication').title('Gelen İş Başvuruları').icon(Send),
            ])
        ),

      S.divider(),

      // 5. İLETİŞİM VE OFİSLER
      S.listItem()
        .title('İletişim & Ofisler')
        .icon(MapPin)
        .child(
          S.list()
            .title('Ofislerimiz')
            .items([
              S.listItem()
                .title('İletişim Sayfası İçerikleri')
                .icon(Map)
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                    .title('İletişim Sayfası Ayarları')
                ),
              S.documentTypeListItem('office').title('Tüm Ofisler & Şubeler').icon(MapPin),
            ])
        ),
    ])
