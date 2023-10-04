import { AvatarCard, Button, UserStatsCard } from "../../components";

export default function EmptyStatePage() {
  return (
    <>
      <h1 className="upper bmtf text-white">My Profile</h1>
      <main className="mt-4 pb-8 md:flex">
        <section>
          <AvatarCard imgSrc="/profile_avatar.png" />
          <span className="mx-3"></span>
          <UserStatsCard />
        </section>
        <section className="mx-auto mt-20 flex flex-col items-center">
          <div className="mb-5">
            <h2 className="text-center text-xl font-semibold text-neutral-900 dark:text-white sm:text-3xl lg:text-3xl">
              Looks like you haven&apos;t
              <br /> started a track yet
            </h2>
          </div>
          <div>
            <Button variant="secondary" className="btf dark:bg-[#44AF96] dark:text-black">
              Get Started!
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
