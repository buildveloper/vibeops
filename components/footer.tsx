export function Footer() {
  return (
    <footer className="border-t border-slate-800 py-6 text-center">
      <p className="text-xs leading-relaxed text-slate-500">
        Made with ❤️ by{" "}
        <a
          href="https://buildveloper.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-slate-400 transition-colors hover:text-indigo-400"
        >
          Christopher John
        </a>{" "}
        •{" "}
        <a
          href="https://buildveloper.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 transition-colors hover:text-indigo-400"
        >
          AI-Native Fullstack &amp; Automation Engineer
        </a>
        {" • "}
        <a
          href="https://x.com/shigusna"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 transition-colors hover:text-indigo-400"
        >
          @shigusna
        </a>
      </p>
    </footer>
  );
}
