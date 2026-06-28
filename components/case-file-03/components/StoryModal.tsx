import React from 'react';

interface StoryModalProps {
  onClose: () => void;
}

export function StoryModal({ onClose }: StoryModalProps) {
  return (
    <div className="modal-overlay">
      <div className="hud-box modal-box" style={{ maxWidth: '600px', borderColor: 'var(--color-accent)' }}>
        <h2 className="modal-title" style={{ color: 'var(--color-accent)' }}>THE SHUTTERING FLAME</h2>
        <div className="modal-content" style={{ textAlign: 'left', lineHeight: '1.6' }}>
          <p className="question-text" style={{ fontStyle: 'italic', color: '#ffbca8' }}>
            "The warmth is fading, yet in its final glow, the truth becomes clear."
          </p>
          <p className="question-text" style={{ marginTop: '1rem' }}>
            Before you floats the sanctuary's core: the Dying Flame. For millennia, it anchored the timelines of the first civilizations, holding back the void. With its sealing, you have stabilized the anomalies that threatened to rewrite history.
          </p>
          <p style={{ marginTop: '1rem', color: 'var(--color-accent)', fontWeight: 'bold' }}>
            "Feed the embers. Let the memories of the worthy endure."
          </p>
          <div className="modal-actions" style={{ marginTop: '2rem' }}>
            <button type="button" onClick={onClose} className="basic-btn primary-btn" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
              Stoke the Flame
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
