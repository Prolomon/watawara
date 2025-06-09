import Copyright from "./Copyright"
import QuickLink from "./QuickLink"
import MoreInfo from "./MoreInfo"
import Accept from "./Accept"

export default function Footer () {
    const company = ["about Watawara", "advertisement", "contact us", "merchant services"]
    const help = ["frequently asked question", "purchase protection", "Reports & Dispute", "sitemap"]
    const customer = ["Feedback survey", "terms and conditions", "return & refund policy", "shipping info", "intellectual property policy"]
    return (
        <footer className="w-full h-auto bg-gray-800 relative">
            <div className="w-11/12 mx-auto ">
                <div className="flex flex-wrap py-6 align-center justify-between gap-4">
                    <QuickLink title={`Company info`} path={company} />
                    <QuickLink title={`help`} path={help} />
                    <QuickLink title={`customer service`} path={customer} />
                    <MoreInfo />
                </div>
                <Accept />
                <Copyright />
            </div>
        </footer>
    )
}