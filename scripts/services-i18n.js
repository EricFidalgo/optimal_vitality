#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         services-i18n.js                                   ║
 * ║                                                                             ║
 * ║  Single source of truth for all service page translations.                 ║
 * ║  Run this script any time you add, edit, or delete a service.              ║
 * ║                                                                             ║
 * ║  Usage:                                                                     ║
 * ║    node scripts/services-i18n.js              — validate + rebuild         ║
 * ║    node scripts/services-i18n.js --rebuild    — force rebuild combined     ║
 * ║    node scripts/services-i18n.js --check      — validate only (no writes)  ║
 * ║    node scripts/services-i18n.js --help       — show this help             ║
 * ║                                                                             ║
 * ║  HOW TO ADD A NEW SERVICE:                                                  ║
 * ║    1. Create  assets/js/i18n/en/services/<id>.json  (English)              ║
 * ║    2. Create  assets/js/i18n/es/services/<id>.json  (Spanish)              ║
 * ║    3. Run:    node scripts/services-i18n.js --rebuild                       ║
 * ║                                                                             ║
 * ║  HOW TO DELETE A SERVICE:                                                   ║
 * ║    1. Delete  assets/js/i18n/en/services/<id>.json                         ║
 * ║    2. Delete  assets/js/i18n/es/services/<id>.json                         ║
 * ║    3. Run:    node scripts/services-i18n.js --rebuild                       ║
 * ║                                                                             ║
 * ║  REQUIRED JSON SHAPE (every service file must have these top-level keys):  ║
 * ║    id, tabLabel, heroHeadline, heroSubheadline, heroCTA,                   ║
 * ║    quiz, eligibility, protocols, science, comparison, faqs                 ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Paths ────────────────────────────────────────────────────────────────────
const ROOT         = path.join(__dirname, '..');
const EN_SERVICES  = path.join(ROOT, 'assets', 'js', 'i18n', 'en', 'services');
const ES_SERVICES  = path.join(ROOT, 'assets', 'js', 'i18n', 'es', 'services');
const EN_COMBINED  = path.join(ROOT, 'assets', 'js', 'i18n', 'en', 'services.json');
const ES_COMBINED  = path.join(ROOT, 'assets', 'js', 'i18n', 'es', 'services.json');

// ─── Required keys every service JSON must contain ───────────────────────────
const REQUIRED_KEYS = [
  'id',
  'tabLabel',
  'heroHeadline',
  'heroSubheadline',
  'heroCTA',
  'quiz',
  'eligibility',
  'protocols',
  'science',
  'comparison',
  'faqs',
];

// ─── Required nested keys ─────────────────────────────────────────────────────
const REQUIRED_NESTED = [
  ['quiz', 'step1'],
  ['quiz', 'step1', 'question'],
  ['quiz', 'step1', 'options'],
  ['quiz', 'protocols'],
  ['quiz', 'timelineMap'],
  ['eligibility', 'items'],
  ['protocols', 'items'],
  ['faqs'],
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getNestedValue(obj, keys) {
  return keys.reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function getServiceFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json') && f !== 'services.json')
    .sort();
}

// ─── Validate a single service JSON ──────────────────────────────────────────
function validateService(filePath) {
  const errors = [];
  const obj = readJson(filePath);
  const name = path.basename(filePath);

  if (!obj) {
    return [`  ✖ ${name}: Invalid JSON — cannot parse file`];
  }

  // Top-level required keys
  REQUIRED_KEYS.forEach(key => {
    if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
      errors.push(`  ✖ ${name}: Missing required key → "${key}"`);
    }
  });

  // Nested required keys
  REQUIRED_NESTED.forEach(keyPath => {
    const val = getNestedValue(obj, keyPath);
    if (val === undefined || val === null) {
      errors.push(`  ✖ ${name}: Missing nested key → ${keyPath.join('.')}`);
    }
    if (Array.isArray(val) && val.length === 0) {
      errors.push(`  ✖ ${name}: Empty array → ${keyPath.join('.')}`);
    }
  });

  // Verify eligibility.items each have label + detail (not undefined)
  if (Array.isArray(obj?.eligibility?.items)) {
    obj.eligibility.items.forEach((item, i) => {
      const label  = item.label  || item.title  || '';
      const detail = item.detail || item.desc   || '';
      if (!label)  errors.push(`  ✖ ${name}: eligibility.items[${i}] missing "label" or "title"`);
      if (!detail) errors.push(`  ✖ ${name}: eligibility.items[${i}] missing "detail" or "desc"`);
    });
  }

  // Verify quiz.protocols keys match quiz.step1.options values
  if (obj?.quiz?.protocols && obj?.quiz?.step1?.options) {
    const optionValues   = obj.quiz.step1.options.map(o => o.value);
    const protocolKeys   = Object.keys(obj.quiz.protocols);
    const missing = optionValues.filter(v => !protocolKeys.includes(v));
    if (missing.length) {
      errors.push(`  ✖ ${name}: quiz.protocols missing keys for step1 option values: [${missing.join(', ')}]`);
    }
  }

  return errors;
}

// ─── Validate both locales for all services ───────────────────────────────────
function validateAll() {
  const enFiles = getServiceFiles(EN_SERVICES);
  const esFiles = getServiceFiles(ES_SERVICES);

  let totalErrors = 0;
  let totalFiles  = 0;

  console.log('\n📋 Validating English service JSONs...');
  enFiles.forEach(file => {
    const errors = validateService(path.join(EN_SERVICES, file));
    totalFiles++;
    if (errors.length) {
      console.error(`\n❌ ${file}:`);
      errors.forEach(e => console.error(e));
      totalErrors += errors.length;
    } else {
      console.log(`  ✔ ${file}`);
    }
  });

  console.log('\n📋 Validating Spanish service JSONs...');
  esFiles.forEach(file => {
    const errors = validateService(path.join(ES_SERVICES, file));
    totalFiles++;
    if (errors.length) {
      console.error(`\n❌ ${file}:`);
      errors.forEach(e => console.error(e));
      totalErrors += errors.length;
    } else {
      console.log(`  ✔ ${file}`);
    }
  });

  // Cross-check: every EN file must have an ES counterpart and vice versa
  console.log('\n🔁 Cross-checking EN ↔ ES parity...');
  const onlyInEn = enFiles.filter(f => !esFiles.includes(f));
  const onlyInEs = esFiles.filter(f => !enFiles.includes(f));

  if (onlyInEn.length) {
    onlyInEn.forEach(f => {
      console.error(`  ✖ EN-only (missing Spanish): ${f}`);
      totalErrors++;
    });
  }
  if (onlyInEs.length) {
    onlyInEs.forEach(f => {
      console.error(`  ✖ ES-only (missing English): ${f}`);
      totalErrors++;
    });
  }
  if (!onlyInEn.length && !onlyInEs.length) {
    console.log(`  ✔ All ${enFiles.length} services have both EN and ES files`);
  }

  return { totalErrors, totalFiles, enFiles, esFiles };
}

// ─── Rebuild combined services.json for a locale ─────────────────────────────
function rebuildCombined(locale) {
  const dir      = locale === 'en' ? EN_SERVICES : ES_SERVICES;
  const outFile  = locale === 'en' ? EN_COMBINED  : ES_COMBINED;
  const files    = getServiceFiles(dir);

  const combined = files
    .map(f => readJson(path.join(dir, f)))
    .filter(Boolean);

  fs.writeFileSync(outFile, JSON.stringify(combined, null, 2), 'utf8');
  console.log(`  ✔ Rebuilt ${locale}/services.json  (${combined.length} services)`);
  return combined.length;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  const args       = process.argv.slice(2);
  const checkOnly  = args.includes('--check');
  const forceRebuild = args.includes('--rebuild');
  const showHelp   = args.includes('--help');

  if (showHelp) {
    const lines = fs.readFileSync(__filename, 'utf8').split('\n').slice(0, 25);
    console.log(lines.join('\n'));
    process.exit(0);
  }

  console.log('══════════════════════════════════════════');
  console.log('  OVI Services i18n — Validate & Rebuild');
  console.log('══════════════════════════════════════════');

  const { totalErrors, enFiles } = validateAll();

  if (checkOnly) {
    console.log('\n──────────────────────────────────────────');
    if (totalErrors === 0) {
      console.log(`✅ All checks passed. (${enFiles.length * 2} files validated)`);
    } else {
      console.error(`\n❌ ${totalErrors} error(s) found. Fix them before rebuilding.`);
    }
    process.exit(totalErrors > 0 ? 1 : 0);
  }

  // Rebuild even if there are errors (so the site at least loads existing content),
  // but warn the developer clearly.
  console.log('\n🔨 Rebuilding combined services.json files...');
  rebuildCombined('en');
  rebuildCombined('es');

  console.log('\n──────────────────────────────────────────');
  if (totalErrors === 0) {
    console.log(`✅ Done — ${enFiles.length} services, both locales rebuilt successfully.`);
  } else {
    console.warn(`\n⚠️  Done with ${totalErrors} validation warning(s).`);
    console.warn('   The combined files were rebuilt, but please fix the issues above.');
    process.exit(1);
  }
}

main();
