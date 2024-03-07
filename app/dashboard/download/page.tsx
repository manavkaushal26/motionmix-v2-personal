import FadeUp from "@/components/global/FadeUp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sdkReleases } from "@/lib/mocks/dashboard";

type Props = {};

const DownloadPage = (props: Props) => {
  return (
    <FadeUp>
      <div className="grid gap-16 sm:grid-cols-2">
        {/* Download card */}
        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 40 },
          }}
          onClick={() => {
            if (user?.role === "admin" || user?.role === "owner") {
              downloadSdk();
            } else {
              setShowModal(true);
            }
          }}
          className="relative p-12 space-y-8 duration-200 cursor-pointer bg-glass rounded-xl h-fit group text-neutral-400 hover:text-neutral-200"
        >
          <ArchiveBoxArrowDownIcon className="w-[60px] h-[60px]" />
          <div className="relative">
            <p className="mt-6 text-2xl font-semibold tracking-tight text-left sm:text-3xl md:text-2xl">
              Download SDK <small>(v1.0.9)</small>
              <ArrowRightIcon className="inline-block w-6 h-6 ml-2 font-bold duration-300 ease-linear group-hover:ml-4" />
            </p>
            {percentage > 0 && percentage < 100 && (
              <motion.div
                className="w-full mt-4 text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Line
                  className="mt-2"
                  percent={percentage}
                  strokeWidth={1}
                  strokeLinecap={"round"}
                />
                <p className="mt-2 text-sm">
                  {getLabel(percentage)}... {percentage}%
                </p>
              </motion.div>
            )}
          </div>
        </motion.div> */}
        {/* Documentation */}
        {/* <Link
          href={config.documentationUrl}
          className="duration-200 cursor-pointer group text-neutral-400 hover:text-neutral-200"
          target="_blank"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 40 },
            }}
            className="relative p-12 space-y-8 bg-glass rounded-xl"
          >
            <DocumentTextIcon className="w-[60px] h-[60px]" />

            <p className="flex items-center mt-6 text-2xl font-semibold tracking-tight text-left sm:text-3xl md:text-2xl">
              Documentation
              <ArrowRightIcon className="inline-block w-6 h-6 ml-2 font-bold duration-300 ease-linear group-hover:ml-4" />
            </p>
          </motion.div>
        </Link> */}
      </div>

      <Card className="bg-[#161616]">
        <CardHeader>
          <CardTitle>Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p>
              If you&apos;re an Android developer, you should get the latest SDK
              Platform-Tools from Android Studio&apos;s SDK Manager or from the
              sdk manager command-line tool. This ensures the tools are saved to
              the right place with the rest of your Android SDK tools and easily
              updated.
            </p>
            <p>
              But if you want just these command-line tools, use the following
              links:
            </p>
            <ul className="pl-6 space-y-2 list-disc">
              <li className="cursor-pointer hover:text-foreground text-muted-foreground hover:underline hover:underline-offset-4">
                Download SDK Platform-Tools for Windows
              </li>
              <li className="cursor-pointer hover:text-foreground text-muted-foreground hover:underline hover:underline-offset-4">
                Download SDK Platform-Tools for Mac
              </li>
              <li className="cursor-pointer hover:text-foreground text-muted-foreground hover:underline hover:underline-offset-4">
                Download SDK Platform-Tools for Linux
              </li>
            </ul>
            <p>
              Although these links do not change, they always point to the most
              recent version of the tools.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Releases information */}
      <Card className="bg-[#161616] mt-4">
        <CardHeader>
          <CardTitle>Revisions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <ul className="space-y-10">
              {sdkReleases.map((release) => (
                <li key={release.version} className="first:mt-3">
                  <p className="text-lg font-semibold text-neutral-200">
                    {release.version} ({release.date})
                  </p>
                  <ul className="pl-6 space-y-4 list-disc">
                    {release.changes.map((change) => (
                      <li key={change.subTitle} className="first:mt-2">
                        <p className="font-semibold">{change.subTitle}</p>
                        <ul className="pl-10 list-disc">
                          {change.desc.map((d, i) => (
                            <li key={i + Math.random()}>{d}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </FadeUp>
  );
};

export default DownloadPage;
