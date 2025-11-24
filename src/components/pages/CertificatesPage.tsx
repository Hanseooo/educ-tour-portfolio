

interface Certificates {
    title: string
    issuer: string
    imageUrl: string
    date: string
    credentialUrl: string | null
}

const certificates : Certificates[] = [
  {
    title: "Full-Stack Web Development",
    issuer: "Coursera",
    imageUrl: "/projects/QuickFlash/cards.png",
    date: "June 2023",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/ABC123456",
  },]


function CertificateCards({ certificate } : { certificate: Certificates }) {
    return (
    <div className="bg-foreground w-96">
        <img className="w-96" src={certificate.imageUrl} alt="" />
    </div>
)
}

export default function CertificatesPage() {
  return (
    <div className="w-full h-full flex flex-col  min-h-screen bg-linear-tr from-background via-primary/5 to-background items-center justify-center">
      <h1 className="text-3xl font-bold">Certificates</h1>
      <div className="w-full p-6 md:p-8 flex flex-col items-center">
        {
            certificates.map((cert, index) => (
                <CertificateCards certificate ={cert} key = {index}  />
            ))
        }
      </div>
    </div>
  );
}