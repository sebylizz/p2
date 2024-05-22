// Sanitizes the user input and articles scraped

function sanitizeinput(input) {
    let sanitize = input.replace(/\r?\n|\r/g, ' ');

    sanitize = sanitize.replace(/[\x00-\x1F\x7F]/g, '');

    sanitize = sanitize.replace(/‘|’|‚|‛/g, "'");

    sanitize = sanitize.replace(/“|”|„|«|»|"/g, '"');

    sanitize = sanitize.replace(/\.{3}/g, '…');

    sanitize = sanitize.replace(/<[^>]+>/g, '');

    sanitize = sanitize.replace(/[\u00A0]/g, ' ').trim();

    sanitize = sanitize.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{E000}-\u{F8FF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{1F300}-\u{1F320}\u{1F32D}-\u{1F335}\u{1F337}-\u{1F37C}\u{1F37E}-\u{1F393}\u{1F3A0}-\u{1F3CA}\u{1F3CF}-\u{1F3D3}\u{1F3E0}-\u{1F3F0}\u{1F3F4}\u{1F3F8}-\u{1F43E}\u{1F440}\u{1F442}-\u{1F4FC}\u{1F4FF}-\u{1F53D}\u{1F54B}-\u{1F54E}\u{1F550}-\u{1F567}\u{1F57A}\u{1F595}-\u{1F596}\u{1F5A4}\u{1F5FB}-\u{1F64F}\u{1F680}-\u{1F6C5}\u{1F6CC}\u{1F6D0}-\u{1F6D2}\u{1F6EB}-\u{1F6EC}\u{1F6F4}-\u{1F6FC}\u{1F7E0}-\u{1F7EB}\u{1F90C}-\u{1F93A}\u{1F93C}-\u{1F945}\u{1F947}-\u{1F971}\u{1F973}-\u{1F976}\u{1F97A}\u{1F97C}-\u{1F9A2}\u{1F9B0}-\u{1F9B9}\u{1F9C0}-\u{1F9C2}\u{1F9D0}-\u{1F9FF}\u{1FA70}-\u{1FA73}\u{1FA78}-\u{1FA7A}\u{1FA80}-\u{1FA82}\u{1FA90}-\u{1FA95}]/gu, '');

    return sanitize;
}

module.exports = sanitizeinput;