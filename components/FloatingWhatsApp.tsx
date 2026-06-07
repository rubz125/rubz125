"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/97254216 7219"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #25d366, #128c7e)",
        boxShadow: "0 8px 32px rgba(37,211,102,0.4)",
      }}
      aria-label="WhatsApp"
    >
      <MessageCircle size={24} fill="white" color="white" />

      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[#25d366]"
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </motion.a>
  );
}
