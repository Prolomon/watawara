import { dbConnect } from "@/backend/server/server"
import { Announcements } from "@/backend/models/announcement.schema"

export default async function Announcement () {
    await dbConnect()
    const announce = await Announcements.findOne({current: true})
    return (
      <>
        {announce.current === true ? (
          <section className="w-full text-normal text-primary bg-gray-800">
            <div className="w-11/12 h-8 mx-auto flex items-center gap-2">
              <div className="w-auto grow overflow-hidden">
                <p className="text-nowrap marquee text-sm">
                  {announce.message}
                </p>
              </div>
            </div>
          </section>
        ) : null}
      </>
    );
}