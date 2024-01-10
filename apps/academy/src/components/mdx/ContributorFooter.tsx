import { Contributor } from "@/components/mdx/Contributor";

interface ContributorFooterProps {
  authors?: string[];
  reviewers?: string[];
  contributors?: string[];
}

export function ContributorFooter({ authors, reviewers, contributors }: ContributorFooterProps) {
  return (
    <div
      className="my-12 border-gray-500 py-4 pb-8"
      // borderTopWidth="thin"
    >
      {authors && Array.isArray(authors) && authors.length > 0 && (
        <div>
          <span className="mb-4 mt-8 text-3xl">{authors.length > 1 ? "Authors" : "Author"}</span>
          <div className="flex-col gap-4 text-left">
            {authors.map((contrib, idx) => (
              <Contributor key={idx} handle={contrib} avatarSize="2xl" />
            ))}
          </div>
        </div>
      )}

      {reviewers && Array.isArray(reviewers) && reviewers.length > 0 && (
        <div>
          <span className="mb-4 mt-8 text-xl">
            {reviewers.length > 1 ? "Reviewers" : "Reviewer"}
          </span>
          <div className="flex-col gap-4 text-left">
            {reviewers.map((contrib, idx) => (
              <Contributor key={idx} handle={contrib} avatarSize="lg" />
            ))}
          </div>
        </div>
      )}

      {contributors && Array.isArray(contributors) && contributors.length > 0 && (
        <div>
          <span className="mb-4 mt-8 text-xl">
            {contributors.length > 1 ? "Additional Contributors" : "Additional Contributor"}
          </span>
          <div className="flex-col gap-4 text-left">
            {contributors.map((contrib, idx) => (
              <Contributor key={idx} handle={contrib} avatarSize="lg" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
