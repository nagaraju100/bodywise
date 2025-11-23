# BodyWise - Project Brief

> **Tagline**: Understand Your Body, Nourish Your Health

## Executive Summary

BodyWise is a cross-platform educational health app that helps general adults understand human body parts, their functions, beneficial foods, and related diseases. The app features animated videos, multiple navigation paths, and a freemium monetization model.

---

## Target Audience

- **Primary**: General adults (25-55 years)
- **Secondary**: Health-conscious individuals, fitness enthusiasts
- **Use Cases**: Health education, dietary planning, disease awareness

---

## Platform & Technology

| Layer | Technology |
|-------|------------|
| **Frontend** | React Native (iOS + Android + Web) |
| **Backend** | Node.js + Express |
| **Database** | PostgreSQL |
| **Video Hosting** | CDN (Cloudflare/AWS CloudFront) |
| **Authentication** | Firebase Auth or Auth0 |
| **CMS** | Strapi or Contentful (headless) |

---

## Core Features

### MVP (Phase 1 - 1-2 months)

1. **Body Explorer**
   - Browse by: Body Systems | Individual Organs | Health Goals
   - Visual body map with clickable regions
   - Search functionality

2. **Content Pages**
   - Body part details with animated video
   - Function/usage explanation
   - Related foods list
   - Common diseases overview

3. **Food Database**
   - Foods categorized by health benefits
   - Nutritional information
   - Linked to body parts they support

4. **Disease Information**
   - Symptoms, causes, prevention
   - Treatment overview (general guidance)
   - Affected body parts

5. **Basic User Features**
   - Favorites/bookmarks
   - Search history
   - Dark/light mode

### Phase 2 (Post-MVP)

- Health Profile with personalized recommendations
- Offline content caching
- Premium subscription features
- Push notifications for health tips
- Community features (optional)

---

## Data Model

### BodyPart
```typescript
interface BodyPart {
  id: string;
  name: string;
  slug: string;
  category: 'organ' | 'system' | 'tissue';
  parentSystemId?: string;
  description: string;
  functions: string[];
  videoUrl: string;
  thumbnailUrl: string;
  imageUrl: string;
  relatedFoodIds: string[];
  relatedDiseaseIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Food
```typescript
interface Food {
  id: string;
  name: string;
  slug: string;
  category: string; // fruits, vegetables, proteins, etc.
  description: string;
  nutrients: Nutrient[];
  healthBenefits: string[];
  benefitsBodyPartIds: string[];
  imageUrl: string;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Nutrient {
  name: string;
  amount: string;
  unit: string;
  dailyValuePercent?: number;
}
```

### Disease
```typescript
interface Disease {
  id: string;
  name: string;
  slug: string;
  affectedBodyPartIds: string[];
  description: string;
  symptoms: string[];
  causes: string[];
  riskFactors: string[];
  prevention: string[];
  treatments: string[];
  whenToSeeDoctor: string;
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  prevalence: string;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### User (Phase 2)
```typescript
interface User {
  id: string;
  email: string;
  displayName: string;
  isPremium: boolean;
  healthProfile?: HealthProfile;
  favorites: string[];
  createdAt: Date;
}

interface HealthProfile {
  age: number;
  gender: string;
  healthGoals: string[];
  existingConditions: string[];
  dietaryRestrictions: string[];
}
```

---

## Content Strategy

### Source
- AI-assisted content generation
- Medical professional review required
- Public health databases (NIH, WHO) for accuracy

### Content Volume (MVP)
- 12 body systems
- 50+ individual organs/parts
- 100+ foods
- 50+ common diseases
- 30+ animated videos (2-3 min each)

### Disclaimer
App will include medical disclaimer:
> "This app is for educational purposes only. It is not intended to provide medical advice. Consult a healthcare professional for medical concerns."

---

## Monetization (Freemium)

### Free Tier
- All body parts with basic descriptions
- Preview videos (30 sec each)
- Basic food recommendations
- Common disease overview
- Ad-supported

### Premium Tier ($4.99/month or $39.99/year)
- Full animated video library
- Detailed disease information
- Personalized health recommendations
- Offline content access
- Ad-free experience
- Health profile features

---

## MVP Timeline (8 weeks)

| Week | Milestone |
|------|-----------|
| 1-2 | Project setup, database schema, API scaffolding |
| 3-4 | Core backend APIs, content CMS setup |
| 5-6 | Frontend: navigation, body explorer, content pages |
| 7 | Search, favorites, basic styling |
| 8 | Testing, bug fixes, deployment |

---

## Success Metrics

- **Downloads**: 10K in first 3 months
- **Retention**: 30% weekly active users
- **Conversion**: 5% free-to-premium
- **Engagement**: 3+ sessions/week average
- **Rating**: 4.0+ app store rating

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Medical accuracy | Professional review, clear disclaimers |
| Content volume | Prioritize most-searched body parts |
| Video production | Start with animations, add videos iteratively |
| Competition | Focus on UX and comprehensive food-body mapping |

---

## Next Steps

1. [ ] Set up development environment
2. [ ] Initialize React Native project
3. [ ] Design database schema in PostgreSQL
4. [ ] Create backend API structure
5. [ ] Set up CMS for content management
6. [ ] Begin UI/UX design mockups
7. [ ] Start content creation pipeline

---

*Generated by SuperClaude Brainstorm Session*
*Ready for implementation with `/sc:implement`*
