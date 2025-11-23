📊 Business Panel - Help Guide

  The /sc:business-panel command provides multi-expert business analysis through simulated discussions between renowned business thought leaders.

  ---
  🎯 What It Does

  Analyzes your business documents, strategies, or ideas through the lens of 9 expert frameworks:

  | Expert              | Framework                          | Best For                           |
  |---------------------|------------------------------------|------------------------------------|
  | Clayton Christensen | Disruption Theory, Jobs-to-be-Done | Product strategy, innovation       |
  | Michael Porter      | Five Forces, Competitive Strategy  | Market analysis, positioning       |
  | Peter Drucker       | Management by Objectives           | Operations, organizational design  |
  | Seth Godin          | Tribe Building, Purple Cow         | Marketing, differentiation         |
  | Kim & Mauborgne     | Blue Ocean Strategy                | New market creation                |
  | Jim Collins         | Good to Great, Flywheel            | Scaling, organizational excellence |
  | Nassim Taleb        | Antifragility, Risk Management     | Risk assessment, resilience        |
  | Donella Meadows     | Systems Thinking                   | Complex system analysis            |
  | Jean-luc Doumont    | Structured Communication           | Pitch decks, documentation         |

  ---
  🚀 Usage Examples

  For Your BodyWise App

  # Analyze your project brief
  /sc:business-panel @PROJECT_BRIEF.md

  # Focus on competitive strategy
  /sc:business-panel @PROJECT_BRIEF.md --experts "porter,christensen,godin"

  # Marketing-focused analysis
  /sc:business-panel @PROJECT_BRIEF.md --focus "marketing"

  # Stress-test your business model
  /sc:business-panel @PROJECT_BRIEF.md --mode debate

  ---
  📋 Analysis Modes

  | Mode       | Command           | Purpose                                |
  |------------|-------------------|----------------------------------------|
  | Discussion | --mode discussion | Collaborative insights (default)       |
  | Debate     | --mode debate     | Challenge assumptions, find weaknesses |
  | Socratic   | --mode socratic   | Question-driven strategic exploration  |
  | Adaptive   | --mode adaptive   | Auto-selects based on content          |

  ---
  💡 Recommended for BodyWise

  Would you like me to run a business panel analysis on your PROJECT_BRIEF.md?

  Suggested analysis:
  /sc:business-panel @PROJECT_BRIEF.md --experts "christensen,porter,godin" --mode discussion

  This would analyze:
  - Christensen: Jobs-to-be-Done for health education apps
  - Porter: Competitive positioning in health app market
  - Godin: Marketing differentiation and user tribe building

  Type yes or run the command above to proceed!