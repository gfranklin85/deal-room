export default function BackgroundArtifacts() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Top-right blue blob */}
      <div
        className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Bottom-left slate blob */}
      <div
        className="absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(100, 116, 139, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Subtle center-top glow */}
      <div
        className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}
