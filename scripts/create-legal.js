const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'privacy-policy.html', title: 'Privacy Policy' },
  { file: 'terms-conditions.html', title: 'Terms & Conditions' },
  { file: 'hipaa-notice.html', title: 'HIPAA Notice' },
  { file: 'medical-disclaimer.html', title: 'Medical Disclaimer' },
  { file: 'sms-consent.html', title: 'SMS Consent Disclosure' },
  { file: 'telehealth-disclosure.html', title: 'Telehealth Disclosure' },
  { file: 'financing-disclosure.html', title: 'Financing Disclosure' },
  { file: 'form-consent.html', title: 'Form Consent Disclaimer' },
  { file: 'results-disclaimer.html', title: 'Results Disclaimer' }
];

const template = (title) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - OVI Wellness</title>
    <!-- Core CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="../assets/css/main.css" rel="stylesheet">
    <style>#lower-content, #footer-root { opacity: 0; }</style>
</head>
<body class="bg-dark text-white">
    <!-- Navbar injected by components.js -->
    <div id="navbar-root"></div>

    <main class="container py-5" style="margin-top: 100px; max-width: 900px; min-height: 50vh;">
        <h1 class="font-family-bebas text-primary mb-4">${title}</h1>
        <div class="bg-dark bg-opacity-50 p-4 p-md-5 rounded border border-secondary">
            <p class="text-white-50 border-bottom border-secondary pb-3 mb-4">Effective Date: June 2026</p>
            <div class="text-white-75 lh-lg">
                <p>Please review these terms carefully. OVI Wellness operates in strict adherence to Florida state medical marketing and telehealth regulations.</p>
                <div class="alert alert-warning text-dark mt-4 border-0" style="background-color: #ffc107;">
                    <i class="fas fa-exclamation-triangle me-2"></i> <em>This content must be reviewed by legal counsel prior to public launch.</em>
                </div>
            </div>
        </div>
    </main>

    <!-- Shared footer injected by components.js -->
    <div id="footer-root"></div>

    <!-- Core Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/data/global.js"></script>
    <script src="../assets/js/core/components.js"></script>
    <script src="../assets/js/core/component-loader.js"></script>
</body>
</html>`;

const dir = path.join(__dirname, '../legal');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

pages.forEach(page => {
    fs.writeFileSync(path.join(dir, page.file), template(page.title));
    console.log(`Created ${page.file}`);
});
