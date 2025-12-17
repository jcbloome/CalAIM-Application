'use client';

// This is essentially a wrapper around the core CS Summary Form component.
// It ensures that the form is loaded within the admin layout without a duplicate header.
import CsSummaryFormCorePage from '@/app/forms/cs-summary-form/components/CsSummaryFormCore';

export default function AdminEditFormPage() {
    return <CsSummaryFormCorePage />;
}
