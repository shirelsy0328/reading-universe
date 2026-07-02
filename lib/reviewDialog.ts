export const OPEN_REVIEW_DIALOG_EVENT = "reading-universe:open-review-dialog";
export const REVIEW_SAVED_EVENT = "reading-universe:review-saved";

export type OpenReviewDialogDetail = {
  bookId: string;
};

export type ReviewSavedDetail = {
  bookId: string;
};

export function openReviewDialog(bookId: string) {
  window.dispatchEvent(
    new CustomEvent<OpenReviewDialogDetail>(OPEN_REVIEW_DIALOG_EVENT, {
      detail: { bookId },
    })
  );
}

export function notifyReviewSaved(bookId: string) {
  window.dispatchEvent(
    new CustomEvent<ReviewSavedDetail>(REVIEW_SAVED_EVENT, {
      detail: { bookId },
    })
  );
}
