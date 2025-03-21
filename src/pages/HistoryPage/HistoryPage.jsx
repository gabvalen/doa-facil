import React, { useState } from "react";
import {
  HeaderAndFooter,
  HeaderAndFooterContainer,
} from "../../components/Layouts/HeaderAndFooter.jsx";
import { SectionHeader } from "../HomePage/components/SectionHeader.jsx";
import DonationUserItemDoados from "../UserProfile/components/DonationUserItemDoado.jsx";

const HistoryPage = () => {
  return (
    <HeaderAndFooterContainer>
      <HeaderAndFooter>
        <div className="max-w-7xl mx-auto px-4 py-8 contrast:bg-custom-black">
          {/* Minhas Doações */}
          <section className="mt-12 mb-8">
            <SectionHeader label="Histórico" title="Minhas doações" />
            <DonationUserItemDoados />
          </section>
        </div>
      </HeaderAndFooter>
    </HeaderAndFooterContainer>
  );
};

export default HistoryPage;
